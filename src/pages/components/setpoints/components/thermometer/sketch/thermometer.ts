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

    this.setpoint = config.setpoint;
    this.current = 8;
    this.deadzone = 1;

    this.gradients = config.gradients;

    this.gradientSize = config.height / config.gradients;

    this.width = config.width;
    this.height = config.height;

    this.center = this.p5.createVector(this.p5.width / 2, this.p5.height / 2);
  }

  update = () => {};

  draw = () => {
    this.drawHot();
    this.drawCold();
    this.drawDeadzone();

    this.drawGradients();
    this.drawText();
  };

  drawText = () => {
    // Text
    this.p5.push();
    this.p5.textSize(this.config.textSize);
    this.p5.translate(this.center.x - this.width / 3, this.center.y - this.gradientSize * 5);
    for (let i = 0; i < this.gradients; i++) {
      if (i % 1 === 0) {
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.stroke(0);
        this.p5.fill(255);
        this.p5.text(this.setpoint + 5 - i, -20, i * this.gradientSize);
      }
    }
    this.p5.pop();
  };

  drawHot = () => {
    // Hot
    this.colour = "#E5572E";
    this.p5.push();
    this.p5.fill(this.colour);
    this.p5.translate(this.center.x - this.width / 2, this.center.y - this.height / 2);
    this.p5.rect(0, 0, this.width, this.height / 2);
    this.p5.pop();

    // Bulb at top
    this.p5.push();
    this.p5.fill(this.colour);
    this.p5.translate(this.center.x, this.center.y - this.height / 2);
    this.p5.ellipse(0, 0, this.width);
    this.p5.pop();
  };

  drawDeadzone = () => {
    // Deadzone
    this.colour = "#86A95B";
    this.p5.push();
    this.p5.fill(this.colour);
    this.p5.translate(this.center.x - this.width / 2, this.center.y);
    this.p5.rect(0, 0, this.width, this.deadzone * this.gradientSize);
    this.p5.pop();
  };

  drawCold = () => {
    // Cold bit
    this.colour = "#274666";
    this.p5.push();
    this.p5.fill(this.colour);
    this.p5.translate(this.center.x - this.width / 2, this.center.y);
    this.p5.rect(0, 0, this.width, this.height / 2);
    this.p5.pop();
    // Bulb at bottom
    this.p5.push();
    this.p5.fill(this.colour);
    this.p5.translate(this.center.x, this.center.y + this.height / 2);
    this.p5.ellipse(0, 0, this.width);
    // this.p5.text(this.setpoint, 0, 0);
    this.p5.pop();
  };

  drawGradients = () => {
    this.p5.fill(255, 255, 255);
    for (let i = 0; i < this.gradients; i++) {
      this.p5.rect(this.center.x - this.width / 2, this.center.y - this.height / 2 + (this.height / this.gradients) * i, 5, 1);
    }
  };
}
