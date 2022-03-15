import React from "react";
import { useQuery } from "react-query";
import { IMangaData } from "../Interfaces/Manga";
import { fetchMangasPromise } from "../Services/MangaDexApi";
import Manga from "./Manga";

export default function MangaList() {
  const mangaListQuery = useQuery<IMangaData[], Error>(`manga list`, () =>
    fetchMangasPromise(),
  );

  const mangaListData = mangaListQuery.data;

  const { isSuccess } = mangaListQuery;

  console.log(mangaListData);

  return (
    <div>
      {isSuccess &&
        mangaListData?.map((manga) => (
          <div key={manga?.id}>
            <Manga styleType="card" title={manga?.attributes?.title.en} />
          </div>
        ))}
    </div>
  );
}
