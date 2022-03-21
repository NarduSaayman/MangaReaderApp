import React from "react";
import { useQuery } from "react-query";
import { IMangaData } from "../Interfaces/Manga";
import MangaStyle from "../Interfaces/MangaStyles";
import { fetchMangasPromise } from "../Services/MangaDexApi";
import Manga from "./Manga";
import "../Styles/MangaList.css";

export default function MangaList() {
  const amount = 20;
  const mangaListQuery = useQuery<IMangaData[], Error>(
    [`mangas`, amount],
    () => fetchMangasPromise(amount),
    { enabled: !!amount },
  );

  const mangaListData = mangaListQuery.data;

  console.log(mangaListData);

  const { isSuccess } = mangaListQuery;

  return (
    <div className="flex overflow-x-scroll flex-row gap-10 py-10 px-16 bg-body-alt snap-x snap-mandatory md:gap-40 no-scrollbar">
      {isSuccess &&
        mangaListData?.map((manga) => (
          <div
            className="max-w-xs rounded-xl shadow-lg snap-center sm:max-w-none "
            key={manga?.id}
          >
            <Manga
              styleType={MangaStyle.CARD}
              mangaID={manga?.id}
              coverID={
                manga?.relationships.find(({ type }) => type === `cover_art`)
                  ?.id || ``
              }
              title={manga?.attributes?.title.en}
              altTitleEN={
                manga?.attributes?.altTitles.find((lang) => lang.en)?.en || ``
              }
              tags={manga?.attributes?.tags}
              description=""
              year={manga?.attributes?.year}
            />
          </div>
        ))}
    </div>
  );
}
