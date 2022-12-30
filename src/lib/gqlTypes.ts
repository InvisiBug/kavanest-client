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

export type Heating = {
  state?: boolean;
  connected?: boolean;
  _id?: string;
};

export type Radiator = {
  connected?: boolean;
  temperature?: number;
  valve?: boolean;
  fan?: boolean;
  _id?: string;
};

export type Sensor = {
  temperature: number;
  connected?: boolean;
  offset?: number;
  _id: string;
};

export type Room = {
  deadzone: boolean;
  setpoints: {
    weekday: Record<string, string>;
    weekend: Record<string, string>;
  };
};
