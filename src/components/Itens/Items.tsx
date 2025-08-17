import { DeleteIcon, RotateCcw } from "lucide-react";
import React, { useState } from "react";
import Button from "../utils/Button";
import { ItemEditForm } from "./ItemEditForm";
import ItemModel from "../../models/ItemModel";

interface ItemProps {
  items: ItemModel[];
  onDeleteItem: (id: string) => void;
  onModifyItem: (id: string, newTitle: string) => void;
}

const Itens: React.FC<ItemProps> = ({ items, onDeleteItem, onModifyItem }) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  function onDeleteItemClick(id: string) {
    onDeleteItem(id);
  } // ao deletar item

  const handleSaveItem = (newTitle: string) => {
    if (editingItemId !== null) {
      // caso esteja modificando
      onModifyItem(editingItemId, newTitle);
      setEditingItemId(null);
    }
  }; // ao salvar o item modificado

  const handleModifyClick = (item: ItemModel) => {
    setEditingItemId(item.id);
  }; // ao clicar no botão de edição

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
