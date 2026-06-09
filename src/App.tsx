import "./App.css";
import useItems from "./components/Itens/useItems";
import Itens from "./components/Itens/Items";
import AddItem from "./components/Itens/AddItem";
import ItemSetManager from "./components/Itens/ItemSetManager";
import WheelDecide from "./components/Wheel/WheelDecide";
import SettingsPanel from "./components/Wheel/SettingsPanel";
import MovieScrap from "./components/MovieScrap";
import Button from "./components/utils/Button";
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
  { id: 4, name: "Neon Pulse", colors: ["#0f172a", "#22d3ee"] },
  { id: 5, name: "Sunset Blaze", colors: ["#fb7185", "#f59e0b"] },
  { id: 6, name: "Deep Ocean", colors: ["#0ea5e9", "#1e293b"] },
  { id: 7, name: "Violet Grid", colors: ["#8b5cf6", "#14b8a6"] },
];

const fontOptions: FontModel[] = [
  { id: 1, value: "Roboto", name: "Roboto" },
  { id: 2, value: "Comic Relief", name: "Comic Relief" },
  { id: 3, value: "Rubik Wet Paint", name: "Rubik Wet Paint" },
  { id: 4, value: "Montserrat", name: "Montserrat" },
  { id: 5, value: "Bebas Neue", name: "Bebas Neue" },
  { id: 6, value: "Orbitron", name: "Orbitron" },
  { id: 7, value: "Press Start 2P", name: "Press Start 2P" },
];

function App() {
  const {
    items,
    savedSets,
    activeSetId,
    activeSetName,
    addItemSubmit,
    deleteItem,
    duplicateItem,
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
    eliminateAfterTwoFalls,
    toggleEliminateAfterTwoFalls,
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
  } = useWheel(
    items,
    isEliminatory,
    eliminateAfterTwoFalls,
    deleteItem,
  );

  /* Página Secreta */
  const navigate = useNavigate(); //uso do hook useNavigate para navegar entre as páginas
  function onSecretClick() {
    //uso do queryParams para passar o título do item  ele vai tratar qualquer coisa sem ter risco de haver um erro
    const queryParams = new URLSearchParams();
    navigate(`/secret?${queryParams.toString()}`);
  } // paginar para página secret

  const activeCollectionLabel = activeSetName ?? "Rascunho atual";
  const currentModeLabel = isEliminatory
    ? eliminateAfterTwoFalls
      ? "Eliminatório 2x"
      : "Eliminatório"
    : "Normal";
  const currentSummary = `${currentModeLabel} • ${items.length} itens • ${savedSets.length} sets salvos`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <header className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 shadow-lg shadow-black/10 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Roleta do Chat
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Conjunto ativo: {activeCollectionLabel}
              </p>
            </div>

            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
              {currentSummary}
            </span>
          </div>
        </header>

        <main className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-start">
          <aside className="space-y-4 lg:col-start-1 lg:row-start-1">
            <section className="rounded-3xl border border-cyan-400/10 bg-slate-900/75 p-4 shadow-xl shadow-black/10 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    Itens
                  </p>
                </div>

                <span className="hidden shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 sm:inline-flex">
                  Edição rápida
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <AddItem onAddItemSubmit={addItemSubmit} />

                <Itens
                  items={items}
                  onDeleteItem={deleteItem}
                  onDuplicateItem={duplicateItem}
                  onModifyItem={modifyItem}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-xl shadow-black/10 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                    Ajustes
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setOptionOpen(!optionOpen)}
                className="mt-4 w-full bg-slate-700 text-sm text-white hover:bg-slate-600"
              >
                Modificar Roleta
              </Button>

              {optionOpen ? (
                <div className="mt-4">
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
                    eliminateAfterTwoFalls={eliminateAfterTwoFalls}
                    onEliminateAfterTwoFallsChange={
                      toggleEliminateAfterTwoFalls
                    }
                  />
                </div>
              ) : null}
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-xl shadow-black/10 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                    Importação
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <MovieScrap onItemsReady={handleLetterboxdItems} />
              </div>
            </section>
          </aside>

          <section className="space-y-4 lg:sticky lg:top-6 lg:col-start-2 lg:row-start-1">
            <div className="rounded-[32px] border border-emerald-400/10 bg-slate-900/80 p-4 shadow-xl shadow-black/10 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                    Roleta
                  </p>
                </div>

                <span className="hidden shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 sm:inline-flex">
                  {wheelData.length} opções
                </span>
              </div>

              <div className="mt-4 rounded-[28px] border border-white/10 bg-slate-950/60 p-3 sm:p-6">
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

                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={handleSpinClick}
                    className="w-full max-w-[320px] bg-emerald-600 px-10 py-3 text-lg font-bold text-white hover:bg-emerald-700"
                  >
                    Girar
                  </Button>
                </div>
              </div>
            </div>

            <section className="rounded-3xl border border-cyan-400/10 bg-slate-900/75 p-4 shadow-xl shadow-black/10 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    Conjuntos
                  </p>
                </div>

                <span className="hidden shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 sm:inline-flex">
                  {savedSets.length} sets
                </span>
              </div>

              <div className="mt-4">
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
              </div>
            </section>
          </section>
        </main>

        <footer className="rounded-2xl border border-cyan-400/20 bg-slate-950/80 px-4 py-3 shadow-[0_0_24px_rgba(34,211,238,0.14)] sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onSecretClick}
                className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-cyan-200 transition-colors hover:bg-cyan-400/15 hover:text-cyan-100"
              >
                neon live
              </button>
              <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                {items.length} itens
              </span>
              <span className="inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-xs font-medium text-fuchsia-200">
                {savedSets.length} sets
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                {activeCollectionLabel}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-slate-400">
              <span className="h-px w-8 bg-gradient-to-r from-cyan-400 to-transparent" />
              <span>Use a roleta como ponto de partida</span>
              <span className="h-px w-8 bg-gradient-to-l from-emerald-400 to-transparent" />
            </div>
          </div>
        </footer>
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
