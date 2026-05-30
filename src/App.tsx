import "./App.css";
import useItems from "./components/Itens/useItems";
import Itens from "./components/Itens/Items";
import AddItem from "./components/Itens/AddItem";
import ItemSetManager from "./components/Itens/ItemSetManager";
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
    savedSets,
    activeSetId,
    activeSetName,
    addItemSubmit,
    deleteItem,
    modifyItem,
    handleLetterboxdItems,
    selectSet,
    saveCurrentItemsToExistingSet,
    createSetFromCurrentItems,
    renameSet,
    deleteSavedSet,
    resetSavedSets,
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
    <div className="w-full min-h-screen overflow-x-hidden bg-slate-500 flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <div className="flex items-center gap-3 rounded-md bg-slate-600 px-4 py-3">
        {/* Header */}
        <h1 className="min-w-0 flex-1 text-center text-2xl font-bold text-slate-100 sm:text-3xl">
          Roleta do Chat
        </h1>
        <button
          className="shrink-0 rounded-md p-2 text-slate-200 transition-colors hover:bg-slate-700"
          onClick={() => onSecretClick()}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-stretch gap-4 xl:flex-row xl:items-start xl:gap-6">
        {/* LEFT COLUMN */}
        <div className="w-full min-w-0 space-y-3 xl:w-[500px]">
          <ItemSetManager
            savedSets={savedSets}
            activeSetId={activeSetId}
            activeSetName={activeSetName}
            onSelectSet={selectSet}
            onOverwriteSet={saveCurrentItemsToExistingSet}
            onCreateSet={createSetFromCurrentItems}
            onRenameSet={renameSet}
            onDeleteSet={deleteSavedSet}
            onResetAllSets={resetSavedSets}
          />
          <AddItem onAddItemSubmit={addItemSubmit} />
          <Itens
            items={items}
            onDeleteItem={deleteItem}
            onModifyItem={modifyItem}
          />
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setOptionOpen(!optionOpen)}
              className="w-full text-sm bg-slate-600 sm:w-auto"
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
        <div className="flex w-full min-w-0 flex-col items-center gap-4 xl:flex-1">
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
            className="w-full max-w-[320px] bg-slate-600 px-10 py-3 text-lg font-bold text-white hover:bg-slate-700 sm:w-auto"
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
