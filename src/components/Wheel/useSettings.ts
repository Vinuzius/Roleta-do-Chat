import { useCallback, useState } from "react";
import ThemeModel from "../../models/themeModel";

function useSettings(initialTheme: ThemeModel) {
  const [optionOpen, setOptionOpen] = useState(false);
  //const [background, setBackground] = useState(false);  ==> color picker futuro
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [spinDuration, setSpinDuration] = useState(0.5);
  const [fontSize, setFontSize] = useState(20);
  const [isTextWhite, setIsTextWhite] = useState(false);
  const [isEliminatory, setIsEliminatory] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);

  const toggleEliminatory = useCallback(() => {
    setIsEliminatory((valorAtual) => !valorAtual);
  }, []);

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(event.target.value);
  };

  const handleSpinDurationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);

      // Evita que o estado se torne NaN (Not a Number) se o campo estiver vazio
      if (!isNaN(newValue)) {
        setSpinDuration(newValue);
      }
    },
    []
  );

  const handleFontSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);
      if (!isNaN(newValue)) {
        setFontSize(newValue);
      }
    },
    []
  );

  const toggleTextColor = useCallback(() => {
    setIsTextWhite((valorAtual) => !valorAtual);
  }, []); //garante que a função não seja re-criada em memória a cada nova renderização do componente

  return {
    optionOpen,
    setOptionOpen,
    selectedFont,
    handleFontChange,
    spinDuration,
    handleSpinDurationChange,
    fontSize,
    handleFontSizeChange,
    isTextWhite,
    toggleTextColor,
    isEliminatory,
    toggleEliminatory,
    selectedTheme,
    setSelectedTheme,
  };
}

export default useSettings;
