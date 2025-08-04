import { Wheel } from "react-custom-roulette";
import { WheelDataModel } from "../../models/WheelDataModel";

interface DataProps {
  wheelData: WheelDataModel[];
  mustSpin: boolean;
  prizeNumber: number;
  onStopSpinning: () => void;
}

const WheelDecide: React.FC<DataProps> = ({
  wheelData,
  mustSpin,
  prizeNumber,
  onStopSpinning,
}) => {
  if (wheelData.length === 0) {
    return (
      <div className="flex justify-center w-screen">
        <p className="bg-slate-400 text-gray p-2 rounded-md">
          Adicione itens para a roleta
        </p>
      </div>
    );
  }

  return (
    <div className="-mt-3">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={wheelData}
        onStopSpinning={onStopSpinning}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
        fontFamily="Roboto"
        spinDuration={0.7}
        disableInitialAnimation={true}
      />
    </div>
  );
};

export default WheelDecide;
