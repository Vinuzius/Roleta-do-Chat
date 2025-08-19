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
import WheelModal from "./components/utils/Modals/WheelModal";
import useWheel from "./components/Wheel/useWheel";
import useSettings from "./components/Wheel/useSettings";

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
  const {
    items,
    addItemSubmit,
    deleteItem,
    modifyItem,
    handleLetterboxdItems,
  } = useItems();

  const {
    optionOpen,
    setOptionOpen,
    selectedFont,
    handleFontChange,
    spinDuration,
    handleSpinDurationChange,
    fontSize,
    handleFontSizeChange,
    isTextWhite,
    toggleTextColor,
    isEliminatory,
    toggleEliminatory,
    selectedTheme,
    setSelectedTheme,
  } = useSettings(themesColor[0]);

  const {
    wheelData,
    mustSpin,
    prizeNumber,
    modalOpen,
    handleSpinClick,
    onWheelStopSpinning,
    onCloseModal,
  } = useWheel(items, isEliminatory, deleteItem);

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
                onFontChange={handleFontChange}
                fontSize={fontSize}
                onFontSizeChange={handleFontSizeChange}
                spinDuration={spinDuration}
                onSpinDurationChange={handleSpinDurationChange}
                isTextWhite={isTextWhite}
                onTextColorChange={toggleTextColor}
                isEliminatory={isEliminatory}
                onEliminatoryChange={toggleEliminatory}
              />
            )}

            <MovieScrap onItemsReady={handleLetterboxdItems} />
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
