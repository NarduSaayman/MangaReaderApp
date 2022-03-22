import React from "react";
import { useQuery } from "react-query";
import { ICoverListDatum } from "../Interfaces/CoverList";
import { fetchCoverListPromise } from "../Services/MangaDexApi";

export default function MangaList() {
  const coverListQuery = useQuery<ICoverListDatum[], Error>(`cover list`, () =>
    fetchCoverListPromise(),
  );

  const coverListData = coverListQuery.data;

  return (
    <div>
      <img
        src={`https://uploads.mangadex.org/covers/${coverListData?.[9]?.relationships[0].id}/${coverListData?.[9]?.attributes.fileName}`}
        alt=""
      />
    </div>
  );
}
