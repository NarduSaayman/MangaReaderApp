import React from "react";
import { useQuery } from "react-query";
import { ICoverData } from "../Interfaces/Cover";
import { Tag } from "../Interfaces/MangaList";
import MangaStyle from "../Interfaces/MangaStyles";
import { fetchCoverByIDPromise } from "../Services/MangaDexApi";

type MangaProps = {
  mangaID: string;
  coverID: string;
  title: string;
  description: string;
  year: string;
  altTitleEN: string;
  styleType: MangaStyle;
  tags: Tag[];
};

export default function Manga(props: MangaProps) {
  const {
    mangaID,
    coverID,
    title,
    description,
    year,
    altTitleEN,
    styleType,
    tags,
  } = props;
  // Get Cover from manga
  const coverQuery = useQuery<ICoverData, Error>(
    [`cover`, coverID],
    () => fetchCoverByIDPromise(coverID),
    { enabled: !!coverID && coverID !== `` },
  );

  const coverData = coverQuery.data;
  const coverFilename = coverData?.attributes.fileName ?? ``;

  const coverImage = `https://uploads.mangadex.org/covers/${mangaID}/${coverFilename}`;

  const { isLoading } = coverQuery;
  const isError = coverQuery.isError && coverData === undefined;
  const isSuccess = coverQuery.isSuccess && coverFilename !== ``;

  let count = 0;

  return (
    <>
      {isLoading && <div>`Loading...`</div>}
      {isError && (
        <div>{`An error has occurred: ${coverQuery.error?.message}`}</div>
      )}
      {isSuccess && styleType === MangaStyle.CARD && (
        <div className="group flex flex-row font-M-Plus-2 transition duration-300 ease-in-out hover:scale-110">
          <div className="overflow-hidden w-[210px] h-[300px] rounded-l-xl">
            <img
              className="object-cover shrink-0"
              src={`https://uploads.mangadex.org/covers/${mangaID}/${coverFilename}`}
              alt={`${altTitleEN} Cover`}
            />
          </div>
          <div className="px-5 w-80 bg-white rounded-r-2xl">
            <div className="my-auto">
              <h4 className="py-3">
                {tags.map((tag) => {
                  count += 1;
                  if (count === 1) return tag.attributes.name.en.toUpperCase();
                  if (count > 1 && count <= 2)
                    return ` & ${tag.attributes.name.en.toUpperCase()}`;
                  return null;
                })}
              </h4>
              <h4>{year}</h4>
              <h2 className="pt-5 text-4xl truncate">{title}</h2>
              <h3 className="text-lg">{altTitleEN}</h3>
            </div>
          </div>
        </div>
      )}

      {isSuccess && styleType === MangaStyle.HEADERITEM && (
        <div
          className="flex flex-row w-[90vw] h-[70vh] bg-fixed bg-body bg-center bg-cover"
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundBlendMode: `multiply`,
          }}
        >
          <div className="overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={coverImage}
              alt={`${altTitleEN} Cover`}
            />
          </div>
          <div className="max-w-xs">
            <div className="text-white">
              <h2 className="font-M-Plus-2 text-4xl">{title}</h2>
              <h4 className="py-3">
                {tags.map((tag) => {
                  count += 1;
                  if (count === 1) return tag.attributes.name.en.toUpperCase();
                  if (count > 1 && count <= 2)
                    return ` & ${tag.attributes.name.en.toUpperCase()}`;
                  return null;
                })}
              </h4>
              <p className="overflow-hidden h-60 text-ellipsis whitespace-pre-wrap">
                {description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
