import { useEffect, useState } from "react";
import ItemModel from "../../models/ItemModel";

function useItems() {
  const [items, setItems] = useState<ItemModel[]>(() => {
    try {
      const storedItems = localStorage.getItem("items");
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to parse items from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    //nome do que eu quero armazenar, e o que vai ser armazenado
  }, [items]); // sempre que a lista de item for alterada, atualiza o localStorage

  function addItemSubmit(title: string) {
    const newItem = {
      id: crypto.randomUUID(),
      title,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  } // adicionar um novo item

  function deleteItem(id: string) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  } // deleta o item

  function modifyItem(id: string, newTitle: string) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, title: newTitle };
        }

        return item;
      })
    );
  } // modifica o item

  function handleLetterboxdItems(newItems: ItemModel[]) {
    setItems(newItems);
  }

  return {
    items,
    addItemSubmit,
    deleteItem,
    modifyItem,
    handleLetterboxdItems,
  };
}

export default useItems;
