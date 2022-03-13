import React from "react";
import { useQuery } from "react-query";
import { ICoverData } from "../Interfaces/Cover";
import { IMangaData } from "../Interfaces/Manga";
import {
  fetchCoverByIDPromise,
  fetchMangaByIDPromise,
} from "../Services/MangaDexApi";

export default function MangaCard() {
  const mangaQuery = useQuery<IMangaData, Error>(`manga`, () =>
    fetchMangaByIDPromise(`789642f8-ca89-4e4e-8f7b-eee4d17ea08b`),
  );

  const mangaData = mangaQuery.data;
  const coverID =
    mangaData?.relationships.find(({ type }) => type === `cover_art`)?.id || ``;

  const altTitleEN =
    mangaData?.attributes.altTitles.find((lang) => lang.en)?.en || ``;

  const coverQuery = useQuery<ICoverData, Error>(
    [`cover`, coverID],
    () => fetchCoverByIDPromise(coverID),
    { enabled: !!coverID && coverID !== `` },
  );

  const coverData = coverQuery.data;

  const isLoading = mangaQuery.status === `loading`;
  const isError = mangaQuery.status === `error`;
  const isSuccess = mangaQuery.isSuccess && coverQuery.isSuccess;

  // Todo different styling here
  return (
    <>
      {isLoading && <div>`Loading...`;</div>}
      {isError && (
        <div>{`An error has occurred: ${mangaQuery.error?.message}`}</div>
      )}
      {isSuccess && (
        <div>
          <h2 className="whitespace-pre">{mangaData?.attributes.title.en}</h2>
          <div>
            <img
              src={`https://uploads.mangadex.org/covers/${mangaData?.id}/${coverData?.attributes.fileName}`}
              alt={`${altTitleEN} Cover`}
            />
          </div>
        </div>
      )}
    </>
  );
}
