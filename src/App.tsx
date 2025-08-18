import { useCallback, useEffect, useState } from "react";
import "./App.css";
import useItems from "./components/Itens/useItems";
import Itens from "./components/Itens/Items";
import AddItem from "./components/Itens/AddItem";
import WheelDecide from "./components/Wheel/WheelDecide";
import SettingsPanel from "./components/Wheel/SettingsPanel";
import MovieScrap from "./components/MovieScrap";
import Button from "./components/utils/Button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeModel from "./models/themeModel";
import FontModel from "./models/FontModel";
import { WheelDataModel } from "./models/WheelDataModel";
import ItemModel from "./models/ItemModel";
import WheelModal from "./components/utils/Modals/WheelModal";

const themesColor: ThemeModel[] = [
  { id: 1, name: "Flamengo", colors: ["#3e3e3e", "#df3428"] },
  { id: 2, name: "Botafogo", colors: ["#ffffff", "#31393f"] },
  { id: 3, name: "Palmeiras", colors: ["#00ff1f", "#ffffff"] },
];

const fontOptions: FontModel[] = [
  { id: 1, value: "Roboto", name: "Roboto" },
  { id: 2, value: "Comic Relief", name: "Comic Relief" },
  { id: 3, value: "Rubik Wet Paint", name: "Rubik Wet Paint" },
];

function App() {
  /* Items */
  const { items, addItemSubmit, deleteItem, modifyItem } = useItems();

  /* Wheel */
  const [wheelData, setWheelData] = useState([
    { option: "Adicione um Item", id: "0" },
  ] as WheelDataModel[]);

  const [mustSpin, setMustSpin] = useState(false);

  const [prizeNumber, setPrizeNumber] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);

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
      items.length === 0
        ? []
        : items.map((item) => ({ option: item.title, id: item.id }));
    setWheelData(newWheelData);
  } // Adicionar itens da lista na roleta

  function onCloseModal() {
    setModalOpen(false);
    if (isEliminatory) {
      deleteItem(wheelData[prizeNumber].id);
    }
  } // fechar modal

  /* Options */

  const [optionOpen, setOptionOpen] = useState(false);
  //const [background, setBackground] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [spinDuration, setSpinDuration] = useState(0.5);
  const [fontSize, setFontSize] = useState(20);
  const [isTextWhite, setIsTextWhite] = useState(false);
  const [isEliminatory, setIsEliminatory] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themesColor[0]);

  const handleEliminatory = useCallback(() => {
    setIsEliminatory((valorAtual) => !valorAtual);
  }, []);

  function onChangeFont(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedFont(event.target.value);
  }

  const handleSpinDurationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);

      // Evita que o estado se torne NaN (Not a Number) se o campo estiver vazio
      if (!isNaN(newValue)) {
        setSpinDuration(newValue);
      }
    },
    []
  );

  const handleFontSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);
      if (!isNaN(newValue)) {
        setFontSize(newValue);
      }
    },
    []
  );

  const handleTextColor = useCallback(() => {
    setIsTextWhite((valorAtual) => !valorAtual);
  }, []); //garante que a função não seja re-criada em memória a cada nova renderização do componente

  /* Use Effects */

  useEffect(() => {
    onAddWheelData();
  }, []); //Quando inicializar o app, já adiciona os dados da memoria na roleta

  useEffect(() => {
    if (modalOpen) {
      // caso o Modal esteja aberto, vai iniciar um temporizador para fechá-lo
      const timerId = setTimeout(() => {
        onCloseModal();
      }, 5000); // 1000 milissegundos = 1 segundos

      return () => {
        //Esta função é executada se o modal for fechado manualmente antes do tempo acabar
        clearTimeout(timerId);
      };
    }
  }, [modalOpen, onCloseModal]); // Fecha o modal automaticamente após X segundos

  /* Página Secreta */
  const navigate = useNavigate(); //uso do hook useNavigate para navegar entre as páginas

  function onSecretClick() {
    //uso do queryParams para passar o título do item  ele vai tratar qualquer coisa sem ter risco de haver um erro
    const queryParams = new URLSearchParams();
    navigate(`/secret?${queryParams.toString()}`);
  } // paginar para página secret

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
          <AddItem onAddItemSubmit={addItemSubmit} />
          <Itens
            items={items}
            onDeleteItem={deleteItem}
            onModifyItem={modifyItem}
          />
          <div className="flex-col space-y-2 space-x-2">
            <Button
              onClick={() => setOptionOpen(!optionOpen)}
              className="text-sm bg-slate-600"
            >
              Modificar Roleta
            </Button>
            {optionOpen && (
              <SettingsPanel
                themes={themesColor}
                fonts={fontOptions}
                selectedTheme={selectedTheme}
                onThemeChange={setSelectedTheme}
                selectedFont={selectedFont}
                onFontChange={onChangeFont}
                fontSize={fontSize}
                onFontSizeChange={handleFontSizeChange}
                spinDuration={spinDuration}
                onSpinDurationChange={handleSpinDurationChange}
                isTextWhite={isTextWhite}
                onTextColorChange={handleTextColor}
                isEliminatory={isEliminatory}
                onEliminatoryChange={handleEliminatory}
              />
            )}

            <MovieScrap />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <WheelDecide
            wheelData={wheelData}
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            onStopSpinning={onWheelStopSpinning}
            fontFamily={selectedFont}
            fontSize={fontSize}
            spinDuration={spinDuration}
            isTextWhite={isTextWhite}
            theme={selectedTheme}
          />

          <Button
            onClick={handleSpinClick}
            className=" bg-slate-600 hover:bg-slate-700 text-white font-bold text-lg px-10 py-3 rounded-lg"
          >
            Girar
          </Button>
        </div>
      </div>

      {/* WHEEL MODAL */}
      <WheelModal
        modalOpen={modalOpen}
        onCloseModal={onCloseModal}
        wheelData={wheelData}
        prizeNumber={prizeNumber}
      />
    </div>
  );
}

export default App;
