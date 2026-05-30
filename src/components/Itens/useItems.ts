import { useEffect, useState } from "react";
import ItemModel from "../../models/ItemModel";
import type ItemSetModel from "../../models/ItemSetModel";

const ITEM_SETS_STORAGE_KEY = "roulette-item-sets";
const ACTIVE_SET_STORAGE_KEY = "roulette-active-item-set-id";

function cloneItems(items: ItemModel[]): ItemModel[] {
  return items.map((item) => ({ ...item }));
}

function isItemModel(value: unknown): value is ItemModel {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    typeof (value as ItemModel).id === "string" &&
    typeof (value as ItemModel).title === "string"
  );
}

function parseItems(rawValue: string | null): ItemModel[] {
  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isItemModel).map((item) => ({ ...item }));
  } catch (error) {
    console.error("Failed to parse items from localStorage", error);
    return [];
  }
}

function isItemSetModel(value: unknown): value is ItemSetModel {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "items" in value &&
    typeof (value as ItemSetModel).id === "string" &&
    typeof (value as ItemSetModel).name === "string" &&
    Array.isArray((value as ItemSetModel).items)
  );
}

function parseItemSets(rawValue: string | null): ItemSetModel[] {
  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isItemSetModel).map((set) => ({
      id: set.id,
      name: set.name,
      items: cloneItems(set.items.filter(isItemModel)),
    }));
  } catch (error) {
    console.error("Failed to parse item sets from localStorage", error);
    return [];
  }
}

function readStoredItems() {
  if (typeof window === "undefined") {
    return [] as ItemModel[];
  }

  return parseItems(window.localStorage.getItem("items"));
}

function readStoredSets() {
  if (typeof window === "undefined") {
    return [] as ItemSetModel[];
  }

  return parseItemSets(window.localStorage.getItem(ITEM_SETS_STORAGE_KEY));
}

function useItems() {
  const [items, setItems] = useState<ItemModel[]>(() => readStoredItems());
  const [savedSets, setSavedSets] = useState<ItemSetModel[]>(() =>
    readStoredSets(),
  );
  const [activeSetId, setActiveSetId] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedActiveSetId = window.localStorage.getItem(
      ACTIVE_SET_STORAGE_KEY,
    );

    return savedSets.some((set) => set.id === storedActiveSetId)
      ? storedActiveSetId
      : null;
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(ITEM_SETS_STORAGE_KEY, JSON.stringify(savedSets));
  }, [savedSets]);

  useEffect(() => {
    if (activeSetId) {
      localStorage.setItem(ACTIVE_SET_STORAGE_KEY, activeSetId);
      return;
    }

    localStorage.removeItem(ACTIVE_SET_STORAGE_KEY);
  }, [activeSetId]);

  function addItemSubmit(title: string) {
    const newItem = {
      id: crypto.randomUUID(),
      title,
    };

    setItems((previousItems) => [...previousItems, newItem]);
    setActiveSetId(null);
  }

  function deleteItem(id: string) {
    setItems((previousItems) => previousItems.filter((item) => item.id !== id));
    setActiveSetId(null);
  }

  function duplicateItem(id: string) {
    let wasDuplicated = false;

    setItems((previousItems) => {
      const itemIndex = previousItems.findIndex((item) => item.id === id);

      if (itemIndex < 0) {
        return previousItems;
      }

      const duplicatedItem = {
        ...previousItems[itemIndex],
        id: crypto.randomUUID(),
      };

      const nextItems = [...previousItems];
      const availablePositions = [] as number[];

      for (let position = 0; position <= previousItems.length; position += 1) {
        const canAvoidAdjacency = previousItems.length > 1;

        if (
          canAvoidAdjacency &&
          (position === itemIndex || position === itemIndex + 1)
        ) {
          continue;
        }

        availablePositions.push(position);
      }

      const insertionIndex =
        availablePositions[
          Math.floor(Math.random() * availablePositions.length)
        ];

      nextItems.splice(insertionIndex, 0, duplicatedItem);
      wasDuplicated = true;

      return nextItems;
    });

    if (wasDuplicated) {
      setActiveSetId(null);
    }

    return wasDuplicated;
  }

  function modifyItem(id: string, newTitle: string) {
    setItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id === id) {
          return { ...item, title: newTitle };
        }

        return item;
      }),
    );
    setActiveSetId(null);
  }

  function handleLetterboxdItems(newItems: ItemModel[]) {
    setItems(cloneItems(newItems));
    setActiveSetId(null);
  }

  function selectSet(setId: string) {
    const selectedSet = savedSets.find((set) => set.id === setId);

    if (!selectedSet) {
      return false;
    }

    setItems(cloneItems(selectedSet.items));
    setActiveSetId(selectedSet.id);

    return true;
  }

  function saveCurrentItemsToExistingSet(setId: string) {
    const targetSet = savedSets.find((set) => set.id === setId);

    if (!targetSet) {
      return false;
    }

    setSavedSets((previousSets) =>
      previousSets.map((set) =>
        set.id === setId ? { ...set, items: cloneItems(items) } : set,
      ),
    );
    setActiveSetId(setId);

    return true;
  }

  function createSetFromCurrentItems(name: string) {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return null;
    }

    const newSet = {
      id: crypto.randomUUID(),
      name: trimmedName,
      items: cloneItems(items),
    };

    setSavedSets((previousSets) => [...previousSets, newSet]);
    setActiveSetId(newSet.id);

    return newSet;
  }

  function renameSet(setId: string, newName: string) {
    const targetSet = savedSets.find((set) => set.id === setId);

    if (!targetSet) {
      return false;
    }

    const trimmedName = newName.trim();

    if (!trimmedName) {
      return false;
    }

    setSavedSets((previousSets) =>
      previousSets.map((set) =>
        set.id === setId ? { ...set, name: trimmedName } : set,
      ),
    );

    return true;
  }

  function deleteSavedSet(setId: string) {
    const targetSet = savedSets.find((set) => set.id === setId);

    if (!targetSet) {
      return false;
    }

    setSavedSets((previousSets) =>
      previousSets.filter((set) => set.id !== setId),
    );

    if (activeSetId === setId) {
      setActiveSetId(null);
    }

    return true;
  }

  function resetSavedSets() {
    setSavedSets([]);
    setActiveSetId(null);
  }

  const activeSetName =
    savedSets.find((set) => set.id === activeSetId)?.name ?? null;

  return {
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
  };
}

export default useItems;
