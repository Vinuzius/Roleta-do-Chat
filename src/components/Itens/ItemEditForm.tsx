import { useState, KeyboardEvent } from "react";
import { Check, X } from "lucide-react";
import Button from "../utils/Button";

interface ItemEditFormProps {
  initialTitle: string;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
}

export const ItemEditForm: React.FC<ItemEditFormProps> = ({
  initialTitle,
  onSave,
  onCancel,
}) => {
  const [editedTitle, setEditedTitle] = useState(initialTitle);

  const handleSave = () => {
    // Só salva se o título não estiver vazio
    if (editedTitle.trim()) {
      onSave(editedTitle);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSave();
    if (event.key === "Escape") onCancel();
  };

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
      <input
        type="text"
        maxLength={18}
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="min-w-0 flex-1 rounded-md border border-slate-400 p-2 outline-blue-500"
        autoFocus
        onKeyDown={handleKeyDown}
      />
      <Button
        onClick={handleSave}
        className="w-full bg-green-500 hover:bg-green-600 sm:w-auto"
      >
        <Check className="h-4 w-4" />
        <span className="text-sm font-semibold sm:hidden">Salvar</span>
      </Button>
      <Button
        onClick={onCancel}
        className="w-full bg-red-500 hover:bg-red-600 sm:w-auto"
      >
        <X className="h-4 w-4" />
        <span className="text-sm font-semibold sm:hidden">Cancelar</span>
      </Button>
    </div>
  );
};
