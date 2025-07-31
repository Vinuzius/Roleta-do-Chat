import { useEffect, useState } from "react";
import "./App.css";
import Itens from "./components/Itens/Items";
import AddItem from "./components/Itens/AddItem";
import ItemModel from "./models/ItemModel";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items") || "[]") as ItemModel[]
  );
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    //nome do que eu quero armazenar, e o que vai ser armazenado
  }, [items]);

  function onAddItemSubmit(title: string) {
    // adicionar um novo item
    const newItem = {
      id: items.length + 1,
      title,
    };
    setItems([...items, newItem]);
  }

  function onDeleteItem(id: number) {
    // deleta um item
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-3">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Roleta do Chat
        </h1>
        <AddItem onAddItemSubmit={onAddItemSubmit} />
        <Itens items={items} onDeleteItem={onDeleteItem} />
      </div>
    </div>
  );
}

export default App;
