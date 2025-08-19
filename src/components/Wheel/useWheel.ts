import { useCallback, useEffect, useState } from "react";
import { WheelDataModel } from "../../models/WheelDataModel";
import ItemModel from "../../models/ItemModel";

function useWheel(
  items: ItemModel[],
  isEliminatory: boolean,
  deleteItem: (id: string) => void
) {
  const [wheelData, setWheelData] = useState<WheelDataModel[]>([
    { option: "Adicione um Item", id: "0" },
  ]);
  const [mustSpin, setMustSpin] = useState(false);

  const [prizeNumber, setPrizeNumber] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
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

  const handleSpinClick = () => {
    if (!mustSpin && wheelData.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }; // Quando iniciar a roleta

  function onWheelStopSpinning() {
    setMustSpin(false);
    setModalOpen(true);
  } // Quando a roleta para de girar

  const onCloseModal = useCallback(() => {
    setModalOpen(false);
    if (isEliminatory && wheelData[prizeNumber].id) {
      deleteItem(wheelData[prizeNumber].id);
    }
  }, [isEliminatory, prizeNumber, wheelData, deleteItem]); // fechar modal

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
