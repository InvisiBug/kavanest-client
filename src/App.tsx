import React from "react";
import Boop from "./components/boop";

const App: React.FC = () => {
  return (
    <>
      <Boop />
    </>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
  //         boop
  //       </a>
  //       <button>test</button>
  //     </header>
  //   </div>
  // );
};

export default App;

const printBoop = () => {
  console.log("Boop");
};
