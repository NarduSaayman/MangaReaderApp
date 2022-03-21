import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addManga } from "../Store/mangaListSlice";
import { RootState } from "../Store/rtkstore";

export default function RecentReadMangas() {
  const mangaListMangas = useSelector(
    (state: RootState) => state.mangaListMangas,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addManga({
        id: `32d76d19-8a05-4db0-9fc2-e0b0648fe9d0`,
        coverUrl: `4d709522-25f5-4ac0-9b6c-3798a223c7ae.jpg`,
      }),
    );
  }, [dispatch]);

  return <div>{mangaListMangas?.[0]?.id}</div>;
}
