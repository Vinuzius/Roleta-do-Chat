import {
  Fieldset,
  Legend,
  Label,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Select,
  Input,
  Checkbox,
} from "@headlessui/react";
import { ChevronDownIcon, Check, X } from "lucide-react";
import React from "react";
import ThemeModel from "../../models/themeModel";
import FontModel from "../../models/FontModel";

// Props interface for the component
interface SettingsPanelProps {
  themes: ThemeModel[];
  selectedTheme: ThemeModel;
  onThemeChange: (theme: ThemeModel) => void;
  fonts: FontModel[];
  selectedFont: string;
  onFontChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  fontSize: number;
  onFontSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  spinDuration: number;
  onSpinDurationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isTextWhite: boolean;
  onTextColorChange: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  themes,
  fonts,
  selectedTheme,
  onThemeChange,
  selectedFont,
  onFontChange,
  fontSize,
  onFontSizeChange,
  spinDuration,
  onSpinDurationChange,
  isTextWhite,
  onTextColorChange,
}) => {
  // Base style for all inputs and selects for a consistent dark theme
  const baseInputStyle =
    "block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6";

  return (
    <Fieldset className="rounded-xl bg-slate-800/80 p-6 border border-white/10 backdrop-blur-sm">
      <Legend className="text-base font-semibold text-white">
        Customização
      </Legend>
      <div className="mt-4 space-y-6">
        {/* Future feature: Color Picker */}
        {/*
        <Label>
          <Button
            onClick={() => setBackground(!background)}
            className="bg-slate-600 rounded-md"
          >
            Background Color
          </Button>
        </Label>
        {background ? <HexColorPicker /> : null}
        */}

        {/* Theme Selection */}
        <div>
          <Label className="block text-sm font-medium leading-6 text-gray-300">
            Temas
          </Label>
          <Listbox value={selectedTheme} onChange={onThemeChange}>
            <div className="relative mt-2">
              <ListboxButton className={`${baseInputStyle} relative text-left`}>
                <span className="block truncate">{selectedTheme.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {themes.map((theme) => (
                  <ListboxOption
                    key={theme.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-300"
                      }`
                    }
                    value={theme}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium text-white" : "font-normal"
                          }`}
                        >
                          {theme.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>

        {/* Font Selection */}
        <div>
          <Label className="block text-sm font-medium leading-6 text-gray-300">
            Fontes
          </Label>
          <div className="relative mt-2">
            <Select
              value={selectedFont}
              onChange={onFontChange}
              className={`${baseInputStyle} appearance-none`}
            >
              {fonts.map((font) => (
                <option
                  key={font.id}
                  value={font.value}
                  className="bg-slate-700 text-white"
                >
                  {font.name}
                </option>
              ))}
            </Select>
            <ChevronDownIcon
              className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Font Size Slider */}
        <div>
          <Label className="block text-sm font-medium leading-6 text-gray-300">
            Tamanho da Fonte:{" "}
            <span className="font-bold text-white">{fontSize}px</span>
          </Label>
          <Input
            type="range"
            min={10}
            max={35}
            step={0.5}
            value={fontSize}
            onChange={onFontSizeChange}
            className="mt-2 block h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500"
          />
        </div>

        {/* Spin Duration Slider */}
        <div>
          <Label className="block text-sm font-medium leading-6 text-gray-300">
            Duração do Giro:{" "}
            <span className="font-bold text-white">
              {spinDuration.toFixed(1)}s
            </span>
          </Label>
          <Input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={spinDuration}
            onChange={onSpinDurationChange}
            className="mt-2 block h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500"
          />
        </div>

        {/* Text Color Checkbox */}
        <div className="flex items-center gap-x-3 pt-2">
          <Checkbox
            checked={isTextWhite}
            onChange={onTextColorChange}
            className="group h-6 w-6 rounded-md bg-white/10 p-1 ring-1 ring-inset ring-white/10 data-[checked]:bg-indigo-600"
          >
            <X className="hidden h-4 w-4 fill-white group-data-[checked]:block" />
          </Checkbox>
          <Label className="text-sm font-medium leading-6 text-gray-300">
            Cor do Texto Branca
          </Label>
        </div>
      </div>
    </Fieldset>
  );
};

export default SettingsPanel;
