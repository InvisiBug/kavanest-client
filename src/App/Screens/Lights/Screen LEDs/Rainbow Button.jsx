// Components
import React from "react";
import { apiFetch } from "../../../../Helpers/fetch";
import Button from "../../../Helpers/Button";

class RainbowButton extends React.Component {
  constructor() {
    super();

    this.state = {
      titleColour: "white",
      mode: null,
    };
  }

  componentWillMount = () => this.getMode();
  componentDidMount = () =>
    (this.timer1 = setInterval(() => {
      this.getMode();
    }, 100 /* 1 * 1000 */));
  componentWillUnmount = () => clearInterval(this.timer1);

  getMode = () => {
    var cache = JSON.parse(localStorage.getItem("Screen LEDs"));
    try {
      this.setState({ mode: cache.mode });
    } catch (error) {
      this.setState({ titleColour: "orangered" });
    }
  };

  rainbow = () => {
    var cache;
    if (this.state.mode === 0 || this.state.mode === 1 || this.state.mode === 3) {
      this.setState({ mode: 2 });
      apiFetch("/api/screenLEDs/rainbow/on");

      cache = JSON.parse(localStorage.getItem("Screen LEDs"));
      cache.mode = 2;
      localStorage.setItem("Screen LEDs", JSON.stringify(cache));
    } else if (this.state.mode === 2) {
      this.setState({ mode: 0 });
      apiFetch("/api/screenLEDs/colour");

      cache = JSON.parse(localStorage.getItem("Screen LEDs"));
      cache.mode = 0;
      localStorage.setItem("Screen LEDs", JSON.stringify(cache));
    }
  };

  render() {
    return (
      <div className="rainbowButton">
        <Button name="Rainbow" index={0} isActive={this.state.mode === 2} onClick={() => this.rainbow()} />
      </div>
    );
  }
}

export default RainbowButton;
