import React, { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { iCover, Relationship } from "../Interfaces/Cover";
import { iManga } from "../Interfaces/Manga";
import {
  fetchCoverByIDPromise,
  fetchMangaByIDPromise,
} from "../Services/MangaDexApi";

export default function Manga() {
  // const [getManga, setManga] = useState<iManga | null>();

  // const manga$ = fetchMangaByID(`32d76d19-8a05-4db0-9fc2-e0b0648fe9d0`);

  // useEffect(() => {
  //   manga$.subscribe((manga: SetStateAction<iManga | null | undefined>) => {
  //     console.log(manga);
  //     console.log(getManga?.data.attributes.title.en);
  //     if (manga !== null && manga !== undefined) {
  //       setManga(manga);
  //     }
  //   });
  // }, []);

  const [getCoverRelation, setCoverRelation] = useState<
    Relationship | undefined | null
  >(null);
  const [getManga, setManga] = useState<iManga | undefined | null>(null);

  const mangaQuery: UseQueryResult<iManga, Error> = useQuery<iManga, Error>(
    `manga`,
    async () => {
      const res = await fetchMangaByIDPromise(
        `789642f8-ca89-4e4e-8f7b-eee4d17ea08b`,
      );
      return res?.json() as Promise<iManga>;
    },
  );

  useEffect(() => {
    setManga(mangaQuery.data);

    setCoverRelation(
      getManga?.data.relationships.find(
        (relation) => relation.type === `cover_art`,
      ),
    );

    console.log(getManga);
    console.log(getCoverRelation);
  }, [getCoverRelation, getManga, mangaQuery]);

  const mangaCoverQuery: UseQueryResult<iCover, Error> = useQuery<
    iCover,
    Error
  >(
    [`cover`, getCoverRelation],
    async () => {
      const res = await fetchCoverByIDPromise(getCoverRelation.id);
      return res?.json() as Promise<iCover>;
    },
    { enabled: !!getCoverRelation?.id },
  );

  if (mangaQuery.status === `loading`) {
    return <div>`Loading...`;</div>;
  }

  if (mangaQuery.status === `error`) {
    return <div>{`An error has occurred: ${mangaQuery.error?.message}`}</div>;
  }

  return (
    <div>
      <h2 className="whitespace-pre">
        {mangaQuery.data?.data?.attributes?.title?.en}
      </h2>
      <div>
        <img
          src={`https://uploads.mangadex.org/covers/${mangaQuery.data?.data.id}/${mangaCoverQuery.data?.data.attributes.fileName}`}
          alt=""
        />
      </div>
    </div>
  );
}
