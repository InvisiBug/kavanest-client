export type RGBLight = {
  name: string;
  red: number;
  green: number;
  blue: number;
  mode: number;
  connected: boolean;
  state: boolean;
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
  name?: string;
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

export type ComputerAudio = {
  name: string;
  left: boolean;
  right: boolean;
  sub: boolean;
  mixer: boolean;
  connected: boolean;
  _id: string;
};

export type Room = {
  deadzone: number;
  setpoints: {
    weekday: Record<string, string>;
    weekend: Record<string, string>;
  };
};
