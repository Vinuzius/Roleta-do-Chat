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
    <>
      <input
        type="text"
        maxLength={18}
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="w-full p-2 rounded-md border border-slate-400 outline-blue-500"
        autoFocus
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
        <Check />
      </Button>
      <Button onClick={onCancel} className="bg-red-500 hover:bg-red-600">
        <X />
      </Button>
    </>
  );
};
