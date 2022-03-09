import React, { useEffect, useState } from "react";
import { iManga } from "../Interfaces/Manga";
import { getMangaByID } from "../Services/MangaDexApi";

export default function MangaCard() {
  const [getManga, setManga] = useState<iManga | null>();

  const manga$ = getMangaByID(`789642f8-ca89-4e4e-8f7b-eee4d17ea08b`);
  useEffect(() => {
    manga$.subscribe((manga) => {
      console.log(manga);
      setManga(manga);
    });
  }, []);

  return (
    <div>
      <div />
    </div>
  );
}
