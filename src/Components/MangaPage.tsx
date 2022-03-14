import React from "react";
import { useQuery } from "react-query";
import { IMangaChapterData } from "../Interfaces/Chapter";
import { ICoverData } from "../Interfaces/Cover";
import { IMangaData } from "../Interfaces/Manga";
import { IMangaVolumes, IMangaVolumesRoot } from "../Interfaces/MangaVolumes";
import { IMangaPagesRoot } from "../Interfaces/Pages";
import {
  fetchChapterByIDPromise,
  fetchChapterPagesByIDPromise,
  fetchCoverByIDPromise,
  fetchMangaByIDPromise,
  fetchMangaVolumesByIDPromise,
} from "../Services/MangaDexApi";

type PagesProps = {
  pages: string[];
};

function Pages(props: PagesProps) {
  return (
    <div>
      <div />
    </div>
  );
}

export default function Manga() {
  // Get Manga
  const mangaQuery = useQuery<IMangaData, Error>(`manga`, () =>
    fetchMangaByIDPromise(`32d76d19-8a05-4db0-9fc2-e0b0648fe9d0`),
  );

  const mangaData = mangaQuery.data;

  // Cover ID for next query
  const coverID =
    mangaData?.relationships.find(({ type }) => type === `cover_art`)?.id || ``;

  const altTitleEN =
    mangaData?.attributes.altTitles.find((lang) => lang.en)?.en || ``;

  // Get Cover from manga
  const coverQuery = useQuery<ICoverData, Error>(
    [`cover`, coverID],
    () => fetchCoverByIDPromise(coverID),
    { enabled: !!coverID && coverID !== `` },
  );

  const coverData = coverQuery.data;

  // Get Volume
  const mangaVolumeQuery = useQuery<IMangaVolumes, Error>(
    `manga volumes`,
    () => fetchMangaVolumesByIDPromise(mangaData?.id ?? ``),
    { enabled: !!mangaData?.id },
  );

  const mangaVolumeData = mangaVolumeQuery.data;
  const VolumeID = mangaVolumeData?.volumes?.[1].chapters?.[0].id ?? ``;

  console.log(mangaVolumeData);

  // Get First Chapter of First Volume
  const mangaChapterQuery = useQuery<IMangaChapterData, Error>(
    [`manga chapter`, VolumeID],
    () => fetchChapterByIDPromise(VolumeID),
    {
      enabled: !!VolumeID,
    },
  );

  const mangaChapterData = mangaChapterQuery.data;

  // Get Pages from Chapter
  const mangaPagesQuery = useQuery<IMangaPagesRoot, Error>(
    [`manga chapter pages`, mangaChapterData?.id],
    () => fetchChapterPagesByIDPromise(mangaChapterData?.id ?? ``),
    {
      enabled: !!mangaChapterData?.id,
    },
  );

  const mangaPagesData = mangaPagesQuery.data;

  console.log(mangaPagesData);

  const isLoading = mangaQuery.status === `loading`;
  const isError = mangaQuery.status === `error`;
  const isSuccess = mangaQuery.isSuccess && coverQuery.isSuccess;

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
            <div className="whitespace-pre">{mangaPagesData?.chapter.data}</div>
          </div>
          <Pages />
        </div>
      )}
    </>
  );
}
