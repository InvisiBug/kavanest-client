import p5 from "p5";
import Arrow from "./arrow";
import Thermometer from "./thermometer";

export interface Config {
  p5: p5;
  //
  gradients: number;
  //
  setpoint: number;
  current: number;
  deadzone: number;
  //
  width: number;
  height: number;
  //
  textSize: number;
}

// export type Config = Record<string, unknown>;

export const sketch = (p5: p5) => {
  const config = {
    p5,
    ///
    gradients: 10,
    ///
    setpoint: 19.5,
    current: 8,
    deadzone: 1,
    //
    width: 25,
    height: 100,
    //
    textSize: 10,
  };

  let thermometer: Thermometer;
  let arrow: Arrow;
  let noisePos = 0;

  let current;

  p5.setup = () => {
    p5.createCanvas(200, 200);
    thermometer = new Thermometer(config);
    arrow = new Arrow(config);
    // p5.noLoop();
  };

  p5.draw = () => {
    p5.background(50);

    p5.fill(255);
    p5.noStroke();

    thermometer.draw();
    arrow.draw();
    // arrow.update(p5.map(p5.noise(noisePos), 0, 1, 5, 15));
    // p5.rect(0, 0, p5.windowWidth, p5.windowHeight);

    // current = p5.map(p5.noise(noisePos), 0, 1, 5, 15);
    // noisePos += 0.005;

    // @ts-ignore:next-line
    p5.updateWithProps = (props) => {
      console.log("Props", props);
      if (props.currentTemp) {
        arrow.update(props.currentTemp);
        // console.log(props.currentTemp);
      }

      if (props.set) {
        thermometer.update(props.set);
        config.setpoint = parseFloat(props.set);
        console.log(config.setpoint);
      }
    };
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};
