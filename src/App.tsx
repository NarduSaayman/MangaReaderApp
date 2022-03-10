import React from "react";
import { Provider } from "react-redux";
import logo from "./assets/images/logo.svg";
import RecentlyReadMangas from "./Components/RecentlyReadMangas";
import { rtkstore } from "./Store/rtkstore";
import { RecentlyReadState } from "./Store/types";

function App() {
  return (
    <div className="App">
      <div>
        <div>
          <div className="">
            <img className="" src={logo} alt="" />
          </div>
          <h1>TikesReader</h1>
        </div>
        <div>
          <input type="text" />
        </div>
        <div>
          <ul>
            <li>Home</li>
          </ul>
        </div>
      </div>

      <div>
        <Provider store={rtkstore}>
          <RecentlyReadMangas />
        </Provider>
      </div>
    </div>
  );
}

export default App;
