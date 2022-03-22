import React from "react";
import { useQuery } from "react-query";
import { ICoverData } from "../Interfaces/Cover";
import { fetchCoverByIDPromise } from "../Services/MangaDexApi";
import Modal from "./ReadMangaModal";

type MangaProps = {
  mangaID: string;
  coverID: string;
  title: string;
  altTitleEN: string;
  styleType: string;
};

export default function Manga(props: MangaProps) {
  const { mangaID, coverID, title, altTitleEN, styleType } = props;
  // Get Cover from manga
  const coverQuery = useQuery<ICoverData, Error>(
    [`cover`, coverID],
    () => fetchCoverByIDPromise(coverID),
    { enabled: !!coverID && coverID !== `` },
  );

  const coverData = coverQuery.data;
  const coverFilename = coverData?.attributes.fileName ?? ``;

  const { isLoading } = coverQuery;
  const isError = coverQuery.isError && coverData === undefined;
  const isSuccess = coverQuery.isSuccess && coverFilename !== ``;

  return (
    <>
      {isLoading && <div>`Loading...`;</div>}
      {isError && (
        <div>{`An error has occurred: ${coverQuery.error?.message}`}</div>
      )}
      {isSuccess && styleType === `card` && (
        <div>
          <Modal
            mangaID={mangaID}
            title={title}
            altTitleEN={altTitleEN}
            coverFilename={coverFilename}
          />
        </div>
      )}
    </>
  );
}
