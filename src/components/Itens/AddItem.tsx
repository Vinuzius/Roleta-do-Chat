import { useState } from "react";
import { DialogPanel, DialogTitle, Dialog } from "@headlessui/react";

interface AddItemProps {
  onAddItemSubmit: (title: string) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onAddItemSubmit }) => {
  const [title, setTitle] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //coloquei como função para melhor visualização
    setTitle(event.target.value);
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
    <div className="space-y-3 p-4 flex flex-col bg-slate-200 rounded-md shadow">
      <input
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        type="text"
        placeholder="Digite o título a ser adicionado"
        value={title}
        onChange={handleTitleChange}
      />
      <button
        onClick={onClickSubmit}
        className="bg-slate-400 text-white px-4 p-2 rounded-md font-medium"
      >
        Adicionar Item
      </button>

      <Dialog
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <DialogTitle className="font-semibold text-lg text-slate-800">
              Erro
            </DialogTitle>
            <p className="mt-2 text-sm text-slate-600">
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
