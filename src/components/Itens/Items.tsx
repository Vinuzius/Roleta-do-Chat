import { Copy, DeleteIcon, RotateCcw } from "lucide-react";
import React, { useState } from "react";
import Button from "../utils/Button";
import { ItemEditForm } from "./ItemEditForm";
import ItemModel from "../../models/ItemModel";

interface ItemProps {
  items: ItemModel[];
  onDeleteItem: (id: string) => void;
  onDuplicateItem: (id: string) => void;
  onModifyItem: (id: string, newTitle: string) => void;
}

const Itens: React.FC<ItemProps> = ({
  items,
  onDeleteItem,
  onDuplicateItem,
  onModifyItem,
}) => {
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
      <ul className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/75 p-4 shadow-lg shadow-black/10">
        {items.map((item) => (
          <li
            className="rounded-lg border border-white/10 bg-slate-950/60 p-2"
            key={item.id}
          >
            {editingItemId === item.id ? (
              <ItemEditForm
                initialTitle={item.title}
                onSave={handleSaveItem}
                onCancel={() => setEditingItemId(null)}
              />
            ) : (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <p className="min-w-0 flex-1 break-words rounded-md bg-slate-700 px-3 py-2 text-white">
                  {item.title}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-2">
                  <Button
                    onClick={() => handleModifyClick(item)}
                    className="w-full bg-slate-700 px-3 sm:w-auto"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="text-sm font-medium sm:hidden">
                      Editar
                    </span>
                  </Button>
                  <Button
                    onClick={() => onDuplicateItem(item.id)}
                    className="w-full bg-cyan-600 px-3 hover:bg-cyan-700 sm:w-auto"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-sm font-medium sm:hidden">
                      Duplicar
                    </span>
                  </Button>
                  <Button
                    onClick={() => onDeleteItemClick(item.id)}
                    className="w-full bg-rose-600 px-3 hover:bg-rose-700 sm:w-auto"
                  >
                    <DeleteIcon className="h-4 w-4" />
                    <span className="text-sm font-medium sm:hidden">
                      Excluir
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Itens;
