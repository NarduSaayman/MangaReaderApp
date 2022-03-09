import React, { useEffect, useState } from "react";
import { iManga } from "../Interfaces/Manga";
import { getMangaByID } from "../Services/MangaDexApi";

export default function MangaCard() {
  const [getManga, setManga] = useState<iManga | null>();

  const manga$ = getMangaByID(`32d76d19-8a05-4db0-9fc2-e0b0648fe9d0`);
  useEffect(() => {
    manga$.subscribe((manga) => {
      console.log(manga);
      console.log(getManga?.data.attributes.title.en);
      setManga(manga);
    });
  }, []);

  return (
    <div>
      <p>{getManga?.data.attributes.title.en}</p>
    </div>
  );
}
