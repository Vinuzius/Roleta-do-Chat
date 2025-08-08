interface WheelDataModel {
  option?: string;
  image?: ImageProps;
  style?: StyleType; // Optional
  optionSize?: number; // Optional
}

interface StyleType {
  backgroundColor?: string; // array
  textColor?: string; //
  fontFamily?: string; //
  fontSize?: number; //
  fontWeight?: number | string; //
  fontStyle?: string; //
}

interface ImageProps {
  uri: string;
  offsetX?: number; // Optional
  offsetY?: number; // Optional
  sizeMultiplier?: number; // Optional
  landscape?: boolean; // Optional
}

export type { WheelDataModel, StyleType, ImageProps };
