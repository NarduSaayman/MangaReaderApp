import React from "react";
import { useQuery } from "react-query";
import { IMangaData } from "../Interfaces/Manga";
import MangaStyle from "../Interfaces/MangaStyles";
import { fetchMangaByTitlePromise } from "../Services/MangaDexApi";
import Manga from "./Manga";

type SingleManga = {
  title: string;
  styleType: MangaStyle;
};

export default function MangaList(props: SingleManga) {
  const { title, styleType } = props;
  const { isSuccess, isLoading, isError, data } = useQuery<IMangaData[], Error>(
    title,
    () => fetchMangaByTitlePromise(title),
  );

  const mangaData = data;
  const mangaID = mangaData?.[0].id ?? ``;
  const coverID =
    mangaData?.[0].relationships.find(({ type }) => type === `cover_art`)?.id ||
    ``;
  const titleEN = mangaData?.[0].attributes?.title.en ?? ``;
  const altTitleEN =
    mangaData?.[0].attributes.altTitles.find((lang) => lang.en)?.en || ``;
  const tags =
    mangaData?.[0].attributes?.tags.filter(
      (tag) => tag.attributes.group === `genre`,
    ) || [];
  const description = mangaData?.[0].attributes.description.en || ``;
  const year = mangaData?.[0].attributes.year || ``;

  const hasData = mangaData !== undefined;

  return (
    <div>
      {isSuccess && hasData && (
        <Manga
          styleType={styleType}
          mangaID={mangaID}
          coverID={coverID}
          title={titleEN}
          altTitleEN={altTitleEN}
          tags={tags}
          description={description}
          year={year}
        />
      )}
      {isLoading && <div>Loading..</div>}
      {isError && <div>Error...</div>}
    </div>
  );
}
