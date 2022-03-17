import React from "react";
import { useQuery } from "react-query";
import { IMangaData } from "../Interfaces/Manga";
import { fetchMangasPromise } from "../Services/MangaDexApi";
import Manga from "./Manga";

export default function MangaList() {
  const amount = 20;
  const mangaListQuery = useQuery<IMangaData[], Error>(
    [`mangas`, amount],
    () => fetchMangasPromise(amount),
    { enabled: !!amount },
  );

  const mangaListData = mangaListQuery.data;

  const { isSuccess } = mangaListQuery;

  return (
    <div>
      {isSuccess &&
        mangaListData?.map((manga) => (
          <div key={manga?.id}>
            <Manga
              styleType="card"
              mangaID={manga?.id}
              coverID={
                manga?.relationships.find(({ type }) => type === `cover_art`)
                  ?.id || ``
              }
              title={manga?.attributes?.title.en}
              altTitleEN={
                manga?.attributes.altTitles.find((lang) => lang.en)?.en || ``
              }
            />
          </div>
        ))}
    </div>
  );
}
