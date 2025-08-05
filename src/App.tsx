import { useEffect, useState } from "react";
import "./App.css";
import Itens from "./components/Itens/Items";
import AddItem from "./components/Itens/AddItem";
import ItemModel from "./models/ItemModel";
import WheelDecide from "./components/Wheel/WheelDecide";
import { WheelDataModel } from "./models/WheelDataModel";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items") || "[]") as ItemModel[]
  );

  const [wheelData, setWheelData] = useState([
    { option: "Adicione um Item" },
  ] as WheelDataModel[]);

  const [mustSpin, setMustSpin] = useState(false);

  const [prizeNumber, setPrizeNumber] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate(); //uso do hook useNavigate para navegar entre as páginas

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    onAddWheelData();
    //nome do que eu quero armazenar, e o que vai ser armazenado
  }, [items]); // sempre que a lista de item for alterada, atualiza o localStorage

  useEffect(() => {
    onAddWheelData();
  }, []); //Quando inicializar o app, já adiciona os dados da memoria na roleta

  useEffect(() => {
    if (modalOpen) {
      // caso o Modal esteja aberto, vai iniciar um temporizador para fechá-lo
      const timerId = setTimeout(() => {
        onCloseModal();
      }, 10000); // 10000 milissegundos = 10 segundos

      return () => {
        //Esta função é executada se o modal for fechado manualmente antes do tempo acabar
        clearTimeout(timerId);
      };
    }
  }, [modalOpen, onCloseModal]); // Fecha o modal automaticamente após X segundos

  function onAddItemSubmit(title: string) {
    const newItem = {
      id: items.length + 1,
      title,
    };
    setItems([...items, newItem]);
  } // adicionar um novo item

  function onDeleteItem(id: number) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  } // deleta um item

  function onModifyItem(id: number) {
    setItems(
      items.map((items) => {
        if (items.id === id) {
          return { ...items, title: "modificado" };
        }
        return items;
      })
    );
  }

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }; // Quando iniciar a roleta

  function onWheelStopSpinning() {
    setMustSpin(false);
    setModalOpen(true);
  } // Quando a roleta para de girar

  function onAddWheelData() {
    const newWheelData =
      items.length === 0 ? [] : items.map((item) => ({ option: item.title }));
    setWheelData(newWheelData);
  } // Adicionar itens da lista na roleta

  function onCloseModal() {
    setModalOpen(false);
  }

  function onSecretClick() {
    //uso do queryParams para passar o título do item  ele vai tratar qualquer coisa sem ter risco de haver um erro
    const queryParams = new URLSearchParams();
    navigate(`/secret?${queryParams.toString()}`);
  }

  return (
    <div className="w-full min-h-screen bg-slate-500 flex flex-col p-6 gap-6">
      <div className="relative flex items-center">
        {/* Header */}
        <h1 className="w-full rounded-md bg-slate-600 py-2 text-center text-3xl font-bold text-slate-100">
          Roleta do Chat
        </h1>
        <div className="absolute right-2">
          <button
            className="p-2 rounded-md text-slate-500 hover:bg-slate-700"
            onClick={() => onSecretClick()}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="w-[500px] space-y-3">
          <AddItem onAddItemSubmit={onAddItemSubmit} />
          <Itens
            items={items}
            onDeleteItem={onDeleteItem}
            onModifyItem={onModifyItem}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <WheelDecide
            wheelData={wheelData}
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            onStopSpinning={onWheelStopSpinning}
          />

          <button
            onClick={handleSpinClick}
            className=" bg-slate-600 hover:bg-slate-700 text-white font-bold text-lg px-10 py-3 rounded-lg"
          >
            Girar
          </button>
        </div>
      </div>

      <Dialog
        open={modalOpen}
        onClose={onCloseModal}
        className="relative z-50 focus:outline-none"
      >
        <div
          className="fixed inset-0 bg-black/30 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
          aria-hidden="true"
        />

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              className="w-full max-w-sm rounded-2xl bg-white/5 p-8 backdrop-blur-2xl
                   border border-white/10 shadow-2xl shadow-black/20
                   transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-center text-sm font-medium text-white/50"
              >
                Resultado
              </DialogTitle>

              <div className="mt-4 text-center">
                <p className="text-2xl font-bold tracking-tight text-white sm:text-5xl">
                  {wheelData && wheelData.length > 0
                    ? `${wheelData[prizeNumber].option}`
                    : `Vazio`}
                </p>
              </div>

              <div className="mt-8 text-center">
                <button
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-2.5 text-base font-semibold text-white
                       border border-transparent
                       transition hover:bg-white/20 hover:border-white/20 
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                  onClick={onCloseModal}
                >
                  Fechar
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
