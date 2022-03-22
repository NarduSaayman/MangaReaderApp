import React from "react";
import { useSelector } from "react-redux";
import MangaStyle from "../Interfaces/MangaStyles";
import { RootState } from "../Store/rtkstore";
import { mangaListState } from "../Store/types";
import SingleManga from "./SingleManga";

export default function UserList() {
  const mangaListMangas = useSelector(
    (state: RootState) => state.mangaListMangas,
  );

  return (
    <>
      <h2 className="p-8 font-Mochiy text-5xl text-body bg-body-alt">
        Reading
      </h2>
      <div className="flex overflow-x-scroll flex-row gap-10 py-10 px-16 bg-body-alt snap-x snap-mandatory md:gap-40 no-scrollbar">
        {mangaListMangas
          .filter((manga) => manga.status === mangaListState.READING)
          .map((manga) => (
            <div
              className="max-w-xs rounded-xl shadow-lg snap-center sm:max-w-none "
              key={manga?.id}
            >
              <SingleManga
                key={manga.id}
                title={manga.title}
                styleType={MangaStyle.CARD}
              />
            </div>
          ))}
      </div>
      <h2 className="p-8 font-Mochiy text-5xl text-body bg-body-alt">
        Planning To Read
      </h2>
      <div className="flex overflow-x-scroll flex-row gap-10 py-10 px-16 bg-body-alt snap-x snap-mandatory md:gap-40 no-scrollbar">
        {mangaListMangas
          .filter((manga) => manga.status === mangaListState.PLAN_TO_READ)
          .map((manga) => (
            <div
              className="max-w-xs rounded-xl shadow-lg snap-center sm:max-w-none "
              key={manga?.id}
            >
              <SingleManga
                key={manga.id}
                title={manga.title}
                styleType={MangaStyle.CARD}
              />
            </div>
          ))}
      </div>
      <h2 className="p-8 font-Mochiy text-5xl text-body bg-body-alt">
        Completed
      </h2>
      <div className="flex overflow-x-scroll flex-row gap-10 py-10 px-16 bg-body-alt snap-x snap-mandatory md:gap-40 no-scrollbar">
        {mangaListMangas
          .filter((manga) => manga.status === mangaListState.COMPLETED)
          .map((manga) => (
            <div
              className="max-w-xs rounded-xl shadow-lg snap-center sm:max-w-none "
              key={manga?.id}
            >
              <SingleManga
                key={manga.id}
                title={manga.title}
                styleType={MangaStyle.CARD}
              />
            </div>
          ))}
      </div>
    </>
  );
}
