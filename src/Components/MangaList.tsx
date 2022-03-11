import React, { useEffect, useState } from "react";
import { iCoverList } from "../Interfaces/CoverList";
import { fetchCoverList } from "../Services/MangaDexApi";

export default function MangaList() {
  const [coverList, setCoverList] = useState<iCoverList | null>(null);

  const coverList$ = fetchCoverList();

  useEffect(() => {
    coverList$.subscribe((covers: React.SetStateAction<iCoverList | null>) => {
      console.log(covers);
      setCoverList(covers);
    });
  }, []);

  return (
    <div>
      <img
        src={`https://uploads.mangadex.org/covers/${coverList?.data[9].relationships[0].id}/${coverList?.data[9].attributes.fileName}`}
        alt=""
      />
    </div>
  );
}
