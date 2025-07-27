import React from "react";

interface Item {
  id: number;
  title: string;
}
interface ItemProps {
  items: Item[];
}

const Itens: React.FC<ItemProps> = ({ items }) => {
  return (
    <div className="space-y-3">
      <h1 className="bg-slate-600 text-gray-100 p-2">Lista de Itens</h1>
      <ul className="space-y-3 p-4 bg-slate-200 rounded-md shadow">
        {items.map((item) => (
          <li className="bg-slate-400 text-white p-2 rounded-md" key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Itens;
