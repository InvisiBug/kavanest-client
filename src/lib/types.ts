export type RGBLight = {
  name: string;
  red: number;
  green: number;
  blue: number;
  mode: number;
  connected: boolean;
  _id: string;
};

export type Plug = {
  name: string;
  state: boolean;
  connected: boolean;
  _id: string;
};
