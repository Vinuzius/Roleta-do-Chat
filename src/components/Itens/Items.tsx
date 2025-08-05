import { Check, DeleteIcon, RotateCcw, X } from "lucide-react";
import React, { useState } from "react";
import Button from "../Button";
import { ItemEditForm } from "./ItemEditForm";

interface Item {
  id: number;
  title: string;
}
interface ItemProps {
  items: Item[];
  onDeleteItem: (id: number) => void;
  onModifyItem: (id: number, newTitle: string) => void;
}

const Itens: React.FC<ItemProps> = ({ items, onDeleteItem, onModifyItem }) => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  function onDeleteItemClick(id: number) {
    onDeleteItem(id);
  }

  const handleSaveItem = (newTitle: string) => {
    if (editingItemId !== null) {
      onModifyItem(editingItemId, newTitle);
      setEditingItemId(null);
    }
  };

  const handleModifyClick = (item: Item) => {
    setEditingItemId(item.id);
  };

  return (
    <div className="space-y-3">
      <ul className="space-y-3 p-4 bg-slate-200 rounded-md shadow">
        {items.map((item) => (
          <li className="flex items-center gap-2" key={item.id}>
            {editingItemId === item.id ? (
              // Se ESTIVER em modo de edição
              <ItemEditForm
                initialTitle={item.title}
                onSave={handleSaveItem}
                onCancel={() => setEditingItemId(null)}
              />
            ) : (
              // Se NÃO ESTIVER em modo de edição
              <>
                <p className="bg-slate-400 text-white w-full p-2 rounded-md">
                  {item.title}
                </p>
                <Button onClick={() => handleModifyClick(item)}>
                  <RotateCcw />
                </Button>
                <Button onClick={() => onDeleteItemClick(item.id)}>
                  <DeleteIcon />
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Itens;
