import { DeleteIcon, RotateCcw } from "lucide-react";
import React from "react";
import Button from "../Button";

interface Item {
  id: number;
  title: string;
}
interface ItemProps {
  items: Item[];
  onDeleteItem: (id: number) => void;
  onModifyItem: (id: number) => void;
}

const Itens: React.FC<ItemProps> = ({ items, onDeleteItem, onModifyItem }) => {
  function onDeleteItemClick(id: number) {
    onDeleteItem(id);
  }

  function onModifyItemClick(id: number) {
    onModifyItem(id);
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-3 p-4 bg-slate-200 rounded-md shadow">
        {items.map((item) => (
          <li className="flex gap-2" key={item.id}>
            <p className="bg-slate-400 text-white w-full p-2 rounded-md">
              {item.title}
            </p>
            <Button onClick={() => onModifyItemClick(item.id)}>
              <RotateCcw />
            </Button>
            <Button onClick={() => onDeleteItemClick(item.id)}>
              <DeleteIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Itens;
