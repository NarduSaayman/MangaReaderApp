import React from "react";
import { useQuery } from "react-query";
import { IMangaData } from "../Interfaces/Manga";
import { fetchMangaByTitlePromise } from "../Services/MangaDexApi";
import Manga from "./Manga";

type SingleManga = {
  title: string;
};

export default function MangaList(props: SingleManga) {
  const { title } = props;
  const mangaQuery = useQuery<IMangaData[], Error>(title, () =>
    fetchMangaByTitlePromise(title),
  );

  const mangaData = mangaQuery.data;

  const { isSuccess } = mangaQuery;
  const hasData = mangaData !== undefined;

  return (
    <div>
      {isSuccess && hasData && (
        <Manga
          styleType="card"
          mangaID={mangaData?.[0].id ?? ``}
          coverID={
            mangaData?.[0].relationships.find(
              ({ type }) => type === `cover_art`,
            )?.id || ``
          }
          title={mangaData?.[0].attributes?.title.en}
          altTitleEN={
            mangaData?.[0].attributes.altTitles.find((lang) => lang.en)?.en ||
            ``
          }
        />
      )}
    </div>
  );
}
