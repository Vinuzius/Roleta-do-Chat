import { Wheel } from "react-custom-roulette";
import { WheelDataModel } from "../../models/WheelDataModel";

interface DataProps {
  wheelData: WheelDataModel[];
}

const WheelDecide: React.FC<DataProps> = ({ wheelData }) => {
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
        mustStartSpinning={false}
        prizeNumber={wheelData.length > 0 ? wheelData.length : 0} // garantir que não pode dar erro
        data={wheelData}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
      />
    </div>
  );
};

export default WheelDecide;
