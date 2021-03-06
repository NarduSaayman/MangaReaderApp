import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import logo from "./assets/images/logo.svg";
import MangaList from "./Components/MangaList";
import SingleManga from "./Components/SingleManga";
import DevPicksMangas from "./Components/DevPickMangas";
import Nav from "./Components/Nav";
import MangaStyle from "./Interfaces/MangaStyles";
import MangaPage from "./Components/MangaPage";
import UserList from "./Components/UserList";
import Login from "./Components/Login";
import Favourites from "./Components/Favourites";
import Searchbar from "./Components/Searchbar";

function App() {
  return (
    <div className="font-M-Plus-2 bg-body">
      <div className="flex sticky top-0 z-10 flex-row gap-3 justify-between bg-body lg:gap-10 xl:gap-52">
        <Link
          aria-label="Main Page"
          to="/"
          className="flex flex-row gap-3 px-5"
        >
          <div className="flex w-11">
            <img
              className="object-cover shrink-0 justify-center items-center"
              src={logo}
              alt=""
            />
          </div>
          <h1 className="hidden my-auto font-Mochiy text-3xl text-white sm:flex">
            TIKE&apos;S<span className="text-primary-red">LIST</span>
          </h1>
        </Link>
        <div className="pb-3 my-auto rounded-lg shadow-searchbar md:w-[80%]">
          <Searchbar />
        </div>
        <div>
          <Nav />
        </div>
      </div>

      <div>
        <Routes>
          <Route
            path="/"
            element={[
              <DevPicksMangas key="DevPicks" />,
              <MangaList key="MangaList" />,
            ]}
          />
          <Route path="/Page/:mangaTitle" element={<MangaPage />} />

          <Route
            path="/single"
            element={
              <SingleManga
                title="Solo Leveling"
                styleType={MangaStyle.HEADERITEM}
              />
            }
          />
          <Route path="/manga-list" element={<UserList />} />
          <Route path="/manga-list/Page/:mangaTitle" element={<MangaPage />} />
          <Route path="/Developers-Picks" element={<DevPicksMangas />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Favourites" element={<Favourites />} />
        </Routes>
      </div>
      {/* 
      <div>
        <RecentlyReadMangas />
      </div> */}
    </div>
  );
}

export default App;
