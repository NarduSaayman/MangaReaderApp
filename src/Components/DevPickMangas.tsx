import React from "react";
import MangaStyle from "../Interfaces/MangaStyles";
import SingleManga from "./SingleManga";
import "../Styles/MangaList.css";

export default function DevPickMangas() {
  return (
    <div>
      <div className="flex overflow-x-scroll flex-row px-16 h-[70vh] snap-x snap-mandatory no-scrollbar">
        <div className="snap-center">
          <SingleManga title="Demon Slayer" styleType={MangaStyle.HEADERITEM} />
        </div>
        <div className="snap-center">
          <SingleManga
            title="Solo Leveling"
            styleType={MangaStyle.HEADERITEM}
          />
        </div>
        <div className="snap-center">
          <SingleManga
            title="Jobless Reincarnation"
            styleType={MangaStyle.HEADERITEM}
          />
        </div>
        <div className="snap-center">
          <SingleManga title="Chainsaw Man" styleType={MangaStyle.HEADERITEM} />
        </div>
      </div>
    </div>
  );
}
