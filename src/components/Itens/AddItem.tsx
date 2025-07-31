import { useState } from "react";

interface AddItemProps {
  onAddItemSubmit: (title: string) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onAddItemSubmit }) => {
  const [title, setTitle] = useState("");
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // para tratar de evento no TSX, voce chama essa biblioteca primeiro
    //coloquei como função para melhor visualização
    setTitle(event.target.value);
  };
  const onClickSubmit = () => {
    if (!title.trim()) {
      return alert("Por favor, digite um título!"); // Validação simples para evitar envio de título vazio
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
    </div>
  );
};

export default AddItem;
