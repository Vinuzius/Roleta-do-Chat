import { Wheel } from "react-custom-roulette";
import { WheelDataModel } from "../../models/WheelDataModel";
import ThemeModel from "../../models/themeModel";

interface DataProps {
  wheelData: WheelDataModel[];
  mustSpin: boolean;
  prizeNumber: number;
  onStopSpinning: () => void;
  fontFamily: string;
  fontSize: number;
  spinDuration: number;
  isTextWhite: boolean;
  theme: ThemeModel;
}

const WheelDecide: React.FC<DataProps> = ({
  wheelData,
  mustSpin,
  prizeNumber,
  onStopSpinning,
  fontFamily,
  fontSize,
  spinDuration,
  isTextWhite,
  theme,
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
        backgroundColors={theme.colors}
        textColors={isTextWhite ? ["#ffffff"] : ["#000000"]}
        fontFamily={fontFamily}
        fontSize={fontSize}
        spinDuration={spinDuration}
        disableInitialAnimation={true}
      />
    </div>
  );
};

export default WheelDecide;
