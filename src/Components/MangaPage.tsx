import React from "react";
import { useQuery } from "react-query";
import { IMangaChapterData } from "../Interfaces/Chapter";
import { ICoverData } from "../Interfaces/Cover";
import { IMangaData } from "../Interfaces/Manga";
import { IMangaVolumes } from "../Interfaces/MangaVolumes";
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
    fetchMangaByIDPromise(`62040a44-0935-46b7-a691-5ae5833af0ae`),
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
  if (mangaVolumeData) {
    console.log(Object.entries(mangaVolumeData.volumes));
  }

  const volumeIndex = mangaVolumeData
    ? +Object.keys(mangaVolumeData.volumes)[0]
    : -1;

  const chapterIndex = mangaVolumeData
    ? +Object.keys(mangaVolumeData.volumes[volumeIndex].chapters)[0]
    : -1;

  const volumeID =
    mangaVolumeData?.volumes?.[volumeIndex].chapters?.[chapterIndex].id ?? ``;

  console.log(mangaVolumeData);

  // Get First Chapter of First Volume
  const mangaChapterQuery = useQuery<IMangaChapterData, Error>(
    [`manga chapter`, volumeID],
    () => fetchChapterByIDPromise(volumeID),
    {
      enabled: !!volumeID,
    },
  );

  const mangaChapterData = mangaChapterQuery.data;

  console.log(mangaChapterData);

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
            <div className="whitespace-pre">
              {mangaPagesData?.chapter.data.map((page) => (
                <img
                  key={page}
                  src={`${mangaPagesData.baseUrl}/data/${mangaPagesData.chapter.hash}/${page}`}
                  alt=""
                />
              ))}
            </div>
          </div>
          <Pages />
        </div>
      )}
    </>
  );
}
