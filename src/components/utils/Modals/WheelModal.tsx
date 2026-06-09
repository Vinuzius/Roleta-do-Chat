import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { WheelDataModel } from "../../../models/WheelDataModel";

interface WheelModalProps {
  modalOpen: boolean;
  onCloseModal: () => void;
  wheelData: WheelDataModel[];
  prizeNumber: number;
}

const WheelModal: React.FC<WheelModalProps> = ({
  modalOpen,
  onCloseModal,
  wheelData,
  prizeNumber,
}) => {
  return (
    <Dialog
      open={modalOpen}
      onClose={onCloseModal}
      className="relative z-50 focus:outline-none"
    >
      <div
        className="fixed inset-0 bg-black/30 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto px-4">
        <div className="flex min-h-full items-center justify-center py-4">
          <DialogPanel
            className="w-full max-w-sm rounded-2xl bg-white/5 p-6 backdrop-blur-2xl sm:p-8
                       border border-white/10 shadow-2xl shadow-black/20
                       transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-center text-sm font-medium text-white/50"
            >
              Resultado
            </DialogTitle>

            <div className="mt-4 text-center">
              <p className="break-words text-2xl font-bold tracking-tight text-white sm:text-5xl">
                {wheelData[prizeNumber]
                  ? `${wheelData[prizeNumber].option}`
                  : "Vazio"}
              </p>
            </div>

            <div className="mt-8 text-center">
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-base font-semibold text-white sm:w-auto
                           border border-transparent
                           transition hover:bg-white/20 hover:border-white/20 
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                onClick={onCloseModal}
              >
                Fechar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default WheelModal;
