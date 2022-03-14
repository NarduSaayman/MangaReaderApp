import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addManga } from "../Store/recentlyreadSlice";
import { RootState } from "../Store/rtkstore";

export default function RecentReadMangas() {
  const recentlyReadMangas = useSelector(
    (state: RootState) => state.recentlyReadMangas,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addManga({
        id: `32d76d19-8a05-4db0-9fc2-e0b0648fe9d0`,
        coverUrl: `4d709522-25f5-4ac0-9b6c-3798a223c7ae.jpg`,
        chapter: `1a8bc908-7847-498f-a71f-69762713e829`,
      }),
    );
  }, [dispatch]);

  return <div>{recentlyReadMangas?.[0]?.id}</div>;
}
