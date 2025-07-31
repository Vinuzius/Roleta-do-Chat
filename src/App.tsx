import { useEffect, useState } from "react";
import "./App.css";
import Itens from "./components/Itens/Items";
import AddItem from "./components/Itens/AddItem";
import ItemModel from "./models/ItemModel";
import WheelDecide from "./components/Wheel/WheelDecide";
import { WheelDataModel } from "./models/WheelDataModel";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items") || "[]") as ItemModel[]
  );

  const [wheelData, setWheelData] = useState([
    { option: "Adicione um Item" },
  ] as WheelDataModel[]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    onAddWheelData();
    //nome do que eu quero armazenar, e o que vai ser armazenado
  }, [items]); // sempre que a lista de item for alterada, atualiza o localStorage

  useEffect(() => {
    onAddWheelData();
  }, []); //Quando inicializar o app, já adiciona os dados da memoria na roleta

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

  function onAddWheelData() {
    const newWheelData =
      items.length === 0 ? [] : items.map((item) => ({ option: item.title }));
    setWheelData(newWheelData);
  }

  return (
    <div className="w-full min-h-screen bg-slate-500 flex flex-col p-6 gap-6">
      <h1 className="text-3xl bg-slate-600 text-slate-100 font-bold text-center">
        Roleta do Chat
      </h1>

      <div className="flex flex-1 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="w-[500px] space-y-3">
          <AddItem onAddItemSubmit={onAddItemSubmit} />
          <Itens items={items} onDeleteItem={onDeleteItem} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex justify-center">
          <WheelDecide wheelData={wheelData} />
        </div>
      </div>
    </div>
  );
}

export default App;
