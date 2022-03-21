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
    <div>
      {mangaListMangas
        .filter((manga) => manga.status === mangaListState.READING)
        .map((manga) => (
          <SingleManga
            key={manga.id}
            title={manga.title}
            styleType={MangaStyle.CARD}
          />
        ))}
    </div>
  );
}
