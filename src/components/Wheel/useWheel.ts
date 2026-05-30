import { useCallback, useEffect, useState } from "react";
import { WheelDataModel } from "../../models/WheelDataModel";
import ItemModel from "../../models/ItemModel";

function useWheel(
  items: ItemModel[],
  isEliminatory: boolean,
  eliminateAfterTwoFalls: boolean,
  deleteItem: (id: string) => void
) {
  const [wheelData, setWheelData] = useState<WheelDataModel[]>([
    { option: "Adicione um Item", id: "0" },
  ]);
  const [mustSpin, setMustSpin] = useState(false);

  const [prizeNumber, setPrizeNumber] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [fallCounts, setFallCounts] = useState<Record<string, number>>({});
  const [pendingDeletionId, setPendingDeletionId] = useState<string | null>(
    null,
  );
  // Effect to update wheelData whenever the items list changes
  useEffect(() => {
    const newWheelData =
      items.length === 0
        ? [
            { option: "Adicione um Item", id: "0" },
            { option: "Por favor", id: "1" },
          ]
        : items.map((item) => ({ option: item.title, id: item.id }));
    setWheelData(newWheelData);
  }, [items]); // Atualiza wheelData quando a lista de items mudar

  useEffect(() => {
    setFallCounts({});
    setPendingDeletionId(null);
  }, [isEliminatory, eliminateAfterTwoFalls]);

  useEffect(() => {
    setFallCounts((previousCounts) => {
      const nextCounts: Record<string, number> = {};

      for (const item of items) {
        const count = previousCounts[item.id];

        if (typeof count === "number") {
          nextCounts[item.id] = count;
        }
      }

      return nextCounts;
    });

    setPendingDeletionId((currentId) =>
      currentId && items.some((item) => item.id === currentId)
        ? currentId
        : null,
    );
  }, [items]);

  const handleSpinClick = () => {
    if (!mustSpin && !modalOpen && wheelData.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }; // Quando iniciar a roleta

  function onWheelStopSpinning() {
    setMustSpin(false);
    const selectedItem = wheelData[prizeNumber];

    if (isEliminatory && selectedItem?.id) {
      if (eliminateAfterTwoFalls) {
        const nextCount = (fallCounts[selectedItem.id] ?? 0) + 1;

        setFallCounts((previousCounts) => ({
          ...previousCounts,
          [selectedItem.id]: nextCount,
        }));

        setPendingDeletionId(nextCount >= 2 ? selectedItem.id : null);
      } else {
        setPendingDeletionId(selectedItem.id);
      }
    } else {
      setPendingDeletionId(null);
    }

    setModalOpen(true);
  } // Quando a roleta para de girar

  const onCloseModal = useCallback(() => {
    setModalOpen(false);

    if (pendingDeletionId) {
      deleteItem(pendingDeletionId);
      setPendingDeletionId(null);
    }
  }, [pendingDeletionId, deleteItem]); // fechar modal

  useEffect(() => {
    if (modalOpen) {
      // caso o Modal esteja aberto, vai iniciar um temporizador para fechá-lo
      const timerId = setTimeout(() => {
        onCloseModal();
      }, 5000); // 1000 milissegundos = 1 segundos

      return () => {
        //Esta função é executada se o modal for fechado manualmente antes do tempo acabar
        clearTimeout(timerId);
      };
    }
  }, [modalOpen, onCloseModal]); // Fecha o modal automaticamente após X segundos

  return {
    wheelData,
    mustSpin,
    prizeNumber,
    modalOpen,
    handleSpinClick,
    onWheelStopSpinning,
    onCloseModal,
  };
}

export default useWheel;
