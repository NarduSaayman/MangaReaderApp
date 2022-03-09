import React, { useEffect, useState } from "react";
import { iCoverList } from "../Interfaces/CoverList";
import { getCoverList } from "../Services/MangaDexApi";

export default function MangaList() {
  const coverList$ = getCoverList();
  const [coverList, setCoverList] = useState<iCoverList | null>(null);

  useEffect(() => {
    coverList$.subscribe((covers) => {
      console.log(covers);
      setCoverList(covers);
    });
  }, []);

  return (
    <div>
      <img
        src={`https://uploads.mangadex.org/covers/${coverList?.data[1].relationships[0].id}/${coverList?.data[1].attributes.fileName}`}
        alt=""
      />
    </div>
  );
}
