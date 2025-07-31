import { ChevronRight, DeleteIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface Item {
  id: number;
  title: string;
}
interface ItemProps {
  items: Item[];
  onDeleteItem: (id: number) => void;
}

const Itens: React.FC<ItemProps> = ({ items, onDeleteItem }) => {
  const navigate = useNavigate(); //uso do hook useNavigate para navegar entre as páginas
  function onSeeDetailsClick(item: Item) {
    //uso do queryParams para passar o título do item  ele vai tratar qualquer coisa sem ter risco de haver um erro
    const queryParams = new URLSearchParams();
    queryParams.set("title", item.title);
    navigate(`/item?${queryParams.toString()}`);
  }

  function onDeleteItemClick(id: number) {
    onDeleteItem(id);
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-3 p-4 bg-slate-200 rounded-md shadow">
        {items.map((item) => (
          <li className="flex gap-2" key={item.id}>
            <p className="bg-slate-400 text-white w-full p-2 rounded-md">
              {item.title}
            </p>
            <Button onClick={() => onSeeDetailsClick(item)}>
              <ChevronRight />
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
