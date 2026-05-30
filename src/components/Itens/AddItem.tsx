import { useState } from "react";
import { DialogPanel, DialogTitle, Dialog } from "@headlessui/react";
import Button from "../utils/Button";

interface AddItemProps {
  onAddItemSubmit: (title: string) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onAddItemSubmit }) => {
  const [title, setTitle] = useState(""); // pude criar um State aqui porque ele nao afeta nada alem do interior do componente
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //coloquei como função para melhor visualização
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Verifica se a tecla pressionada foi a "Enter"
      // Impede o comportamento padrão da tecla Enter (como recarregar a página se estiver num formulário)
      event.preventDefault();
      onClickSubmit();
    }
  };

  const onClickSubmit = () => {
    if (!title.trim()) {
      // Verifica se está vazio
      setIsAlertOpen(true);
      return;
    }

    onAddItemSubmit(title);
    setTitle(""); // Limpa o campo de entrada após o envio
  };

  return (
    <div className="flex w-full flex-col space-y-3 rounded-2xl border border-white/10 bg-slate-900/75 p-4 shadow-lg shadow-black/10">
      <input
        name="adicionar"
        className="w-full rounded-md border border-white/10 bg-slate-950/70 px-4 py-2 text-slate-100 placeholder:text-slate-500 outline-slate-400"
        type="text"
        placeholder="Digite o título a ser adicionado"
        maxLength={18}
        onKeyDown={handleKeyDown}
        value={title}
        onChange={handleTitleChange}
      />
      <Button
        onClick={onClickSubmit}
        className="w-full bg-slate-700 px-4 font-medium hover:bg-slate-600 sm:w-auto"
      >
        Adicionar Item
      </Button>

      <Dialog
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/30">
            <DialogTitle className="font-semibold text-lg text-white">
              Erro
            </DialogTitle>
            <p className="mt-2 text-sm text-slate-300">
              Por favor, digite um título para continuar.
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsAlertOpen(false)}
                className="rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-600"
              >
                OK
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default AddItem;
