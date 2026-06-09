import {
  Check,
  ChevronDown,
  PencilLine,
  RefreshCcw,
  Save,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useState } from "react";
import Button from "../utils/Button";
import type ItemSetModel from "../../models/ItemSetModel";

interface ItemSetManagerProps {
  savedSets: ItemSetModel[];
  activeSetId: string | null;
  activeSetName: string | null;
  onSelectSet: (setId: string) => boolean;
  onOverwriteSet: (setId: string) => boolean;
  onCreateSet: (name: string) => ItemSetModel | null;
  onRenameSet: (setId: string, newName: string) => boolean;
  onDeleteSet: (setId: string) => boolean;
  onResetAllSets: () => void;
}

function getDefaultSetName(savedSets: ItemSetModel[]) {
  return `Conjunto ${savedSets.length + 1}`;
}

function ItemSetManager({
  savedSets,
  activeSetId,
  activeSetName,
  onSelectSet,
  onOverwriteSet,
  onCreateSet,
  onRenameSet,
  onDeleteSet,
  onResetAllSets,
}: ItemSetManagerProps) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [overwriteTargetId, setOverwriteTargetId] = useState(
    activeSetId ?? savedSets[0]?.id ?? "",
  );
  const [newSetName, setNewSetName] = useState(getDefaultSetName(savedSets));
  const [renameValue, setRenameValue] = useState(activeSetName ?? "");
  const [dialogError, setDialogError] = useState("");

  const currentLabel = activeSetName ?? "Rascunho atual";
  const hasSavedSets = savedSets.length > 0;

  function isDuplicateName(name: string, ignoreSetId?: string) {
    const normalizedName = name.trim().toLocaleLowerCase();

    return savedSets.some(
      (set) =>
        set.id !== ignoreSetId &&
        set.name.trim().toLocaleLowerCase() === normalizedName,
    );
  }

  function openSaveDialog() {
    setDialogError("");
    setOverwriteTargetId(activeSetId ?? savedSets[0]?.id ?? "");
    setNewSetName(getDefaultSetName(savedSets));
    setIsSaveDialogOpen(true);
  }

  function closeSaveDialog() {
    setIsSaveDialogOpen(false);
    setDialogError("");
  }

  function openRenameDialog() {
    if (!activeSetId || !activeSetName) {
      return;
    }

    setDialogError("");
    setRenameValue(activeSetName);
    setIsRenameDialogOpen(true);
  }

  function closeRenameDialog() {
    setIsRenameDialogOpen(false);
    setDialogError("");
  }

  function handleOverwriteClick() {
    if (!overwriteTargetId) {
      setDialogError("Selecione um set existente.");
      return;
    }

    const wasSaved = onOverwriteSet(overwriteTargetId);

    if (!wasSaved) {
      setDialogError("Não foi possível localizar o set selecionado.");
      return;
    }

    closeSaveDialog();
  }

  function handleCreateClick() {
    const trimmedName = newSetName.trim();

    if (!trimmedName) {
      setDialogError("Digite um nome para o novo set.");
      return;
    }

    if (isDuplicateName(trimmedName)) {
      setDialogError("Já existe um set com esse nome.");
      return;
    }

    const createdSet = onCreateSet(trimmedName);

    if (!createdSet) {
      setDialogError("Não foi possível criar o novo set.");
      return;
    }

    closeSaveDialog();
  }

  function handleRenameClick() {
    if (!activeSetId) {
      return;
    }

    const trimmedName = renameValue.trim();

    if (!trimmedName) {
      setDialogError("Digite um novo nome para o set.");
      return;
    }

    if (isDuplicateName(trimmedName, activeSetId)) {
      setDialogError("Já existe um set com esse nome.");
      return;
    }

    const wasRenamed = onRenameSet(activeSetId, trimmedName);

    if (!wasRenamed) {
      setDialogError("Não foi possível renomear o set selecionado.");
      return;
    }

    closeRenameDialog();
  }

  function handleDeleteClick() {
    if (!activeSetId || !activeSetName) {
      return;
    }

    const confirmed = window.confirm(
      `Excluir o set \"${activeSetName}\"? Essa ação não pode ser desfeita.`,
    );

    if (!confirmed) {
      return;
    }

    onDeleteSet(activeSetId);
  }

  function handleResetAllClick() {
    const confirmed = window.confirm(
      "Remover todos os sets salvos? Os itens atuais da roleta serão mantidos.",
    );

    if (!confirmed) {
      return;
    }

    onResetAllSets();
  }

  const inputClassName =
    "mt-2 block w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500";

  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/75 p-4 shadow-lg shadow-black/10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Conjunto atual
          </p>
          <p className="truncate text-sm font-semibold text-white">
            {currentLabel}
          </p>
          <p className="text-xs text-slate-400">
            {savedSets.length} conjunto(s) salvo(s)
          </p>
        </div>

        <Menu as="div" className="relative shrink-0 self-start">
          <MenuButton
            disabled={!hasSavedSets}
            className="inline-flex w-full items-center justify-between gap-2 rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {hasSavedSets
              ? (activeSetName ?? "Selecionar conjunto")
              : "Sem conjuntos"}
            <ChevronDown className="h-4 w-4" />
          </MenuButton>

          <MenuItems className="absolute right-0 z-20 mt-2 max-h-64 w-72 max-w-[calc(100vw-2rem)] overflow-auto rounded-lg bg-slate-900 p-1 shadow-xl ring-1 ring-white/10 focus:outline-none sm:w-72">
            {savedSets.length === 0 ? (
              <div className="px-3 py-2 text-sm text-slate-400">
                Nenhum conjunto salvo ainda.
              </div>
            ) : (
              savedSets.map((set) => (
                <MenuItem key={set.id}>
                  {({ focus }) => (
                    <button
                      type="button"
                      onClick={() => onSelectSet(set.id)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm transition-colors ${
                        focus ? "bg-slate-800 text-white" : "text-slate-200"
                      }`}
                    >
                      <span className="truncate">{set.name}</span>
                      {set.id === activeSetId ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : null}
                    </button>
                  )}
                </MenuItem>
              ))
            )}
          </MenuItems>
        </Menu>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <Button
          onClick={openSaveDialog}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          <span className="inline-flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar
          </span>
        </Button>

        <Button
          onClick={openRenameDialog}
          disabled={!activeSetId}
          className="w-full bg-slate-700 hover:bg-slate-600"
        >
          <span className="inline-flex items-center gap-2">
            <PencilLine className="h-4 w-4" />
            Renomear
          </span>
        </Button>

        <Button
          onClick={handleDeleteClick}
          disabled={!activeSetId}
          className="w-full bg-rose-600 hover:bg-rose-700"
        >
          <span className="inline-flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Excluir
          </span>
        </Button>

        <Button
          onClick={handleResetAllClick}
          className="w-full bg-slate-700 hover:bg-slate-600"
        >
          <span className="inline-flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            Resetar tudo
          </span>
        </Button>
      </div>

      <Dialog
        open={isSaveDialogOpen}
        onClose={closeSaveDialog}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-xl bg-slate-900 p-4 text-white shadow-2xl ring-1 ring-white/10 sm:p-6">
            <DialogTitle className="text-lg font-semibold">
              Salvar itens da roleta
            </DialogTitle>
            <p className="mt-1 text-sm text-slate-300">
              Salve o conjunto atual em um set existente ou crie um novo.
            </p>

            {hasSavedSets ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-lg bg-white/5 p-4">
                  <label className="text-sm font-medium text-slate-200">
                    Sobrescrever um set existente
                  </label>
                  <select
                    value={overwriteTargetId}
                    onChange={(event) =>
                      setOverwriteTargetId(event.target.value)
                    }
                    className={inputClassName}
                  >
                    {savedSets.map((set) => (
                      <option
                        key={set.id}
                        value={set.id}
                        className="bg-slate-800 text-white"
                      >
                        {set.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={handleOverwriteClick}
                    className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Salvar no set selecionado
                  </Button>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <label className="text-sm font-medium text-slate-200">
                    Criar um novo set
                  </label>
                  <input
                    type="text"
                    value={newSetName}
                    onChange={(event) => setNewSetName(event.target.value)}
                    placeholder="Nome do novo set"
                    maxLength={32}
                    className={inputClassName}
                  />
                  <Button
                    onClick={handleCreateClick}
                    className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Criar novo set
                  </Button>
                </div>

                {dialogError ? (
                  <p className="text-sm text-rose-400">{dialogError}</p>
                ) : null}
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <label className="text-sm font-medium text-slate-200">
                  Nome do primeiro set
                </label>
                <input
                  type="text"
                  value={newSetName}
                  onChange={(event) => setNewSetName(event.target.value)}
                  placeholder="Nome do novo set"
                  maxLength={32}
                  className={inputClassName}
                />
                <Button
                  onClick={handleCreateClick}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  Criar primeiro set
                </Button>
                {dialogError ? (
                  <p className="text-sm text-rose-400">{dialogError}</p>
                ) : null}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button
                onClick={closeSaveDialog}
                className="w-full bg-slate-700 hover:bg-slate-600 sm:w-auto"
              >
                Cancelar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={isRenameDialogOpen}
        onClose={closeRenameDialog}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-slate-900 p-4 text-white shadow-2xl ring-1 ring-white/10 sm:p-6">
            <DialogTitle className="text-lg font-semibold">
              Renomear set
            </DialogTitle>
            <p className="mt-1 text-sm text-slate-300">
              Ajuste o nome do set selecionado.
            </p>

            <div className="mt-5 space-y-4">
              <label className="text-sm font-medium text-slate-200">
                Novo nome
              </label>
              <input
                type="text"
                value={renameValue}
                onChange={(event) => setRenameValue(event.target.value)}
                placeholder="Novo nome do set"
                maxLength={32}
                className={inputClassName}
              />

              {dialogError ? (
                <p className="text-sm text-rose-400">{dialogError}</p>
              ) : null}

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  onClick={closeRenameDialog}
                  className="w-full bg-slate-700 hover:bg-slate-600 sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleRenameClick}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 sm:w-auto"
                >
                  Salvar nome
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default ItemSetManager;
