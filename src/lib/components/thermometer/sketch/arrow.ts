import { Config } from ".";

export default class Thermometer {
  p5;
  config;
  gradientSize;

  setpoint;
  deadzone;
  current;

  gradients;

  colour = "#274666";
  width;
  height;

  center;

  constructor(config: Config) {
    this.p5 = config.p5;
    this.config = config;

    this.setpoint = 10;
    this.current = 8;
    this.deadzone = 1;

    this.gradients = config.gradients;

    this.gradientSize = config.height / config.gradients;

    this.width = config.width;
    this.height = config.height;

    this.center = this.p5.createVector(this.p5.width / 2, this.p5.height / 2);
  }

  update = (location: number) => {
    this.current = location;
  };

  draw = () => {
    this.drawArrow();
  };

  drawArrow = () => {
    // Arrow
    this.colour = "#F3A710";
    this.p5.push();
    this.p5.fill(this.colour);
    this.p5.translate(this.center.x + this.width / 2, this.center.y + (this.setpoint - this.current) * this.gradientSize);
    this.p5.triangle(0, 0, this.width / 5, -this.width / 5, this.width / 5, this.width / 5);
    this.p5.rect(this.width / 5, -2.5, this.width / 2, 5);
    this.p5.pop();
  };
}
