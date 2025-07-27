import { useState } from "react";
import "./App.css";
import Itens from "./components/Itens/Items";
import AddItem from "./components/Itens/AddItem";

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Fall Guy",
    },
    {
      id: 2,
      title: "La La Land",
    },
    {
      id: 3,
      title: "Blue Valentine",
    },
  ]);

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px]">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Roleta do Chat
        </h1>
        <Itens items={items} />
      </div>
    </div>
  );
}

export default App;
