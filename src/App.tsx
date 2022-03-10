import React from "react";
import logo from "./assets/images/logo.svg";

function App() {
  return (
    <div className="App">
      <div id="Header">
        <div id="Logo">
          <div className="">
            <img className="" src={logo} alt="" />
          </div>
          <h1>TikesReader</h1>
        </div>
        <div>
          <input type="text" />
        </div>
        <div id="Nav" />
      </div>
    </div>
  );
}

export default App;
