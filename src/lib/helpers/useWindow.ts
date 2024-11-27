import { useState, useEffect } from "react";

/**
 * Be careful using this one.
 * If its included in a component and you've called the hooke (even if you're not using the output)
 * re renders will occur whenever the keyboard opens
 * causing the keyboard to close immediately
 * Urgh :(
 */
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export default useWindowDimensions;
