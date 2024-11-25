// Elements
export { default as SelectorTitle } from "./elements/selectorTitle";
export { default as PageContents } from "./elements/pageContents";
export { default as BooleanStateIndicator } from "./elements/booleanStateIndicator";
export { default as RBGStateIndicator } from "./elements/rgbStateIndicator";

// Alloys
export { default as NavBar } from "./alloys/navBar";
export { default as Selector } from "./alloys/selectorFrame";

// Selectors
export { default as RGBLightSelector } from "./alloys/selectors/rgbLightSelector";
export { default as PlugSelector } from "./alloys/selectors/plugSelector";
export { default as PlugSelectorV2 } from "./alloys/selectors/plugSelectorV2";
export { default as HeatingRoomSelector } from "./alloys/selectors/heatingRoomSelector";

// Templates
export { default as Layout } from "./templates/layout";

export * from "./elements/icons";

// Elements
export { default as button } from "./elements/button";

export { default as PageTitle } from "./elements/pageTitle";

export { default as Text } from "./elements/text";
export { default as TimerCountdown } from "./elements/timerCountdown";

// export { useHeating } from "./alloys/heating/heating";
export { default as RoomHeating } from "./alloys/compoundRoomScreen";
export { default as FlameIndicator } from "./elements/flameIndicator";
export { default as CurrentTemp } from "./elements/currentTemp";
export { default as Target } from "./elements/heatingTarget";
export { default as Times } from "./elements/times";
// export { default as Override } from "./alloys/heating/override";
export * from "./alloys/heating";

// export { default as Thermometer } from "./thermometer"; //! Threres a problem running anything reletad to p5js, I think this is the error I ran into in the Sketchbook repo, Needed to upgrade to vite to get rid of it

// Colours
export const on = "#639628";
export const off = "#2c2c2c";
export const disconnected = "orangered";
export const colours = [
  // https://www.w3schools.com/colors/colors_picker.asp
  0xff4000, 0xff8000, 0xffbf00, 0xffff00, 0xbfff00, 0x80ff00, 0x40ff00, 0x00ff00, 0x00ff40, 0x00ff80, 0x00ffbf, 0x00ffff, 0x00bfff, 0x0080ff,
  0x0040ff, 0x0000ff, 0x4000ff, 0x8000ff, 0xbf00ff, 0xff00ff, 0xff00bf, 0xff0080, 0xff0040, 0xff0000,
];

export { default as ColourWheel } from "./alloys/colourWheel/colourWheel";
