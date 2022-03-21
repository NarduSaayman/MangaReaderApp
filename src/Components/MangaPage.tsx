import React from "react";
import { useParams } from "react-router-dom";
import MangaStyle from "../Interfaces/MangaStyles";
import SingleManga from "./SingleManga";

export default function MangaPage() {
  const params = useParams();
  const title = params.mangaTitle as string;
  return <SingleManga title={title} styleType={MangaStyle.PAGE} />;
}
