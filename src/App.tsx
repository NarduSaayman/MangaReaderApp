import React from "react";
import { Route, Routes } from "react-router-dom";
import logo from "./assets/images/logo.svg";
import MangaList from "./Components/MangaList";
import RecentlyReadMangas from "./Components/RecentlyReadMangas";
import SingleManga from "./Components/SingleManga";

function App() {
  return (
    <div className="App">
      <div>
        <div>
          <div className="">
            <img className="" src={logo} alt="" />
          </div>
          <h1>Tike&apos;sReader</h1>
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
        <RecentlyReadMangas />
      </div>

      <div>
        {/* <Manga
            styleType="card"
            title="Kimetsu no Yaiba - Digital Colored Comics"
          /> */}
        <Routes>
          <Route
            path="/single"
            element={<SingleManga title="Solo Leveling" />}
          />
          <Route path="/mangas" element={<MangaList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
