import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineSelector } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICoverData } from "../Interfaces/Cover";
import { Tag } from "../Interfaces/MangaList";
import MangaStyle from "../Interfaces/MangaStyles";
import { fetchCoverByIDPromise } from "../Services/MangaDexApi";
import { mangaListState } from "../Store/types";
import { RootState } from "../Store/rtkstore";
import { addManga, setStatus } from "../Store/mangaListSlice";

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

const mangaStates = [
  { status: mangaListState.PLAN_TO_READ },
  { status: mangaListState.READING },
  { status: mangaListState.COMPLETED },
  { status: mangaListState.DROPPED },
];

export default function Manga(props: MangaProps) {
  const userMnagaList = useSelector(
    (state: RootState) => state.mangaListMangas,
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const [isSelected, setIsSelected] = useState(mangaStates[-1]);

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

  const mangaInStore = userMnagaList.find((item) => item.id === mangaID);

  const updateList = (state: mangaListState) => {
    if (mangaInStore) {
      dispatch(setStatus({ id: mangaInStore.id, status: state }));
    } else {
      dispatch(
        addManga({
          id: mangaID,
          title,
          coverURL: coverImage,
          status: state,
        }),
      );
    }
    setIsSelected({ status: state });
  };

  return (
    <>
      {/* Card Loading */}
      {isLoading && styleType === MangaStyle.CARD && (
        <div className="flex flex-row">
          <div className=" w-[210px] h-[300px] rounded-l-xl animate-pulse" />
          <div className="px-5 min-w-[75%] bg-white rounded-r-2xl sm:w-80">
            <div className="px-36 pt-28 m-auto text-6xl">
              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
            <div className="overflow-hidden my-auto max-h-[300px]">
              <div className="py-3 font-light text-primary-red" />
              <div className="text-sm font-thin" />
              <div className="pt-5 pb-1 text-4xl truncate" />
              <div className="text-lg text-primary-red line-clamp-1" />
              <div className="flex overflow-hidden flex-wrap gap-1 py-3 font-light">
                <div className="px-2 text-xs text-body-alt bg-body/70 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Laoding */}
      {isLoading && styleType === MangaStyle.HEADERITEM && (
        <div className="flex flex-row justify-center w-[90vw] h-[70vh] bg-fixed bg-body bg-center bg-cover">
          <div className="hidden overflow-hidden min-w-[50%] sm:block" />
          <div className="flex flex-col">
            <div className="my-auto max-w-xs sm:px-7 xl:max-w-[80%]">
              <div className="text-white">
                <div className="font-M-Plus-2 text-4xl" />
                <div className="py-3 font-extralight text-primary-red" />
                <div className="overflow-hidden max-w-[inherit] font-light text-gray-300 text-ellipsis line-clamp-3 sm:line-clamp-6" />

                <div className="flex justify-end py-10 lg:justify-start" />
              </div>
            </div>
            <div className="flex justify-end py-11 pr-8 lg:justify-start lg:pl-8" />
          </div>
        </div>
      )}
      {isError && (
        <div>{`An error has occurred: ${coverQuery.error?.message}`}</div>
      )}
      {/* Card Display */}
      {isSuccess && styleType === MangaStyle.CARD && (
        <div
          tabIndex={0}
          role="button"
          onClick={() => navigate(`Page/${title}`)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === `Enter`) {
              navigate(`Page/${title}`);
            }
          }}
          className="group flex flex-row font-M-Plus-2 transition duration-300 ease-in-out hover:scale-110"
        >
          <div className="overflow-hidden w-[210px] h-[300px] rounded-l-xl">
            <img
              className="object-cover shrink-0 w-full h-full"
              src={`https://uploads.mangadex.org/covers/${mangaID}/${coverFilename}`}
              alt={`${altTitleEN} Cover`}
            />
          </div>
          <div className="px-5 min-w-[75%] bg-white rounded-r-2xl sm:w-80">
            <div className="overflow-hidden my-auto max-h-[300px]">
              <h4 className="py-3 font-light text-primary-red">
                {tags
                  .filter((tag) => tag.attributes.group === `genre`)
                  .map((tag) => {
                    count += 1;
                    if (count === 1)
                      return tag.attributes.name.en.toUpperCase();
                    if (count > 1 && count <= 2)
                      return ` & ${tag.attributes.name.en.toUpperCase()}`;
                    return null;
                  })}
              </h4>
              <h4 className="text-sm font-thin">{year}</h4>
              <h2 className="pt-5 pb-1 text-4xl truncate">{title}</h2>
              <h3 className="text-lg text-primary-red line-clamp-1">
                {altTitleEN}
              </h3>
              <h4 className="flex overflow-hidden flex-wrap gap-1 py-3 font-light">
                {tags
                  .filter((tag) => tag.attributes.group !== `genre`)
                  .map((tag) => (
                    <div
                      key={tag.attributes.name.en}
                      className="px-2 text-xs text-body-alt bg-body/70 rounded-full"
                    >
                      {tag.attributes.name.en}
                    </div>
                  ))}
              </h4>
            </div>
          </div>
        </div>
      )}
      {/* Header Display */}
      {isSuccess && styleType === MangaStyle.HEADERITEM && (
        <div
          className="flex flex-row justify-center w-[90vw] h-[70vh] bg-fixed bg-body bg-center bg-cover"
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundBlendMode: `multiply`,
          }}
        >
          <div className="hidden overflow-hidden min-w-[50%] sm:block">
            <img
              className="object-cover w-full h-full"
              src={coverImage}
              alt={`${altTitleEN} Cover`}
            />
          </div>
          <div className="flex flex-col">
            <div className="my-auto max-w-xs sm:px-7 xl:max-w-[80%]">
              <div className="text-white">
                <h2 className="font-M-Plus-2 text-4xl">{title}</h2>
                <h3 className="py-3 font-extralight text-primary-red">
                  {tags
                    .filter((tag) => tag.attributes.group === `genre`)
                    .map((tag) => {
                      count += 1;
                      if (count === 1)
                        return tag.attributes.name.en.toUpperCase();
                      if (count > 1 && count <= 2)
                        return ` & ${tag.attributes.name.en.toUpperCase()}`;
                      return null;
                    })}
                </h3>
                <p className="overflow-hidden max-w-[inherit] font-light text-gray-300 text-ellipsis line-clamp-3 sm:line-clamp-6">
                  {description}
                </p>

                <div className="flex justify-end py-10 lg:justify-start">
                  <Listbox
                    value={isSelected}
                    onChange={(state) => {
                      setIsSelected(state);
                      updateList(state.status);
                    }}
                  >
                    <div className="relative mt-1 w-full sm:w-9/12">
                      <Listbox.Button className="relative  py-2 pr-10 pl-3 w-full text-left bg-white rounded-lg focus-visible:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 shadow-md cursor-default sm:text-sm">
                        <span className="block text-body truncate">
                          {isSelected
                            ? isSelected.status
                            : `Add to manga list?`}
                        </span>
                        <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
                          <HiOutlineSelector
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md focus:outline-none ring-1 ring-black/5 focus:ring-black/75 shadow-lg sm:text-sm">
                          {mangaStates.map((state) => (
                            <Listbox.Option
                              key={state.status}
                              className={({ active }) =>
                                `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                  active
                                    ? `text-red-900 bg-red-100`
                                    : `text-gray-900`
                                }`
                              }
                              value={state}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? `font-medium` : `font-normal`
                                    }`}
                                  >
                                    {state.status}
                                  </span>
                                  {selected ? (
                                    <span className="flex absolute inset-y-0 left-0 items-center pl-3 text-red-600">
                                      <AiOutlineCheck
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
            </div>
            <div className="flex justify-end py-11 pr-8 lg:justify-start lg:pl-8">
              <button
                className="text-primary-red hover:text-red-500"
                type="button"
                onClick={() => navigate(`Page/${title}`)}
              >{`view more >`}</button>
            </div>
          </div>
        </div>
      )}
      {/* Page Display */}
      {isSuccess && styleType === MangaStyle.PAGE && (
        <div
          className="flex flex-row justify-center w-full h-screen bg-fixed bg-body bg-center bg-cover"
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundBlendMode: `multiply`,
          }}
        >
          <div className="hidden overflow-hidden min-w-[50%] sm:block">
            <img
              className="object-cover w-full h-full"
              src={coverImage}
              alt={`${altTitleEN} Cover`}
            />
          </div>
          <div className="flex flex-col">
            <div className="my-auto max-w-sm sm:px-7 xl:max-w-[80%]">
              <div className="text-white">
                <h2 className="font-M-Plus-2 text-4xl">{title}</h2>
                <h3 className="py-3 font-extralight text-primary-red">
                  {tags
                    .filter((tag) => tag.attributes.group === `genre`)
                    .map((tag) => {
                      count += 1;
                      if (count === 1)
                        return tag.attributes.name.en.toUpperCase();
                      if (count > 1 && count <= 2)
                        return ` & ${tag.attributes.name.en.toUpperCase()}`;
                      return null;
                    })}
                </h3>
                <p className="overflow-y-scroll pr-6 max-w-[inherit] h-[25vh] font-light text-gray-300 text-ellipsis line-clamp-none">
                  {description}
                </p>

                <div className="flex justify-end py-10 lg:justify-start">
                  <Listbox
                    value={isSelected}
                    onChange={(state) => {
                      setIsSelected(state);
                      updateList(state.status);
                    }}
                  >
                    <div className="relative mt-1 w-full sm:w-9/12">
                      <Listbox.Button className="relative  py-2 pr-10 pl-3 w-full text-left bg-white rounded-lg focus-visible:border-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 shadow-md cursor-default sm:text-sm">
                        <span className="block text-body truncate">
                          {isSelected
                            ? isSelected.status
                            : `Add to manga list?`}
                        </span>
                        <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
                          <HiOutlineSelector
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md focus:outline-none ring-1 ring-black/5 focus:ring-black/75 shadow-lg sm:text-sm">
                          {mangaStates.map((state) => (
                            <Listbox.Option
                              key={state.status}
                              className={({ active }) =>
                                `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                  active
                                    ? `text-red-900 bg-red-100`
                                    : `text-gray-900`
                                }`
                              }
                              value={state}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? `font-medium` : `font-normal`
                                    }`}
                                  >
                                    {state.status}
                                  </span>
                                  {selected ? (
                                    <span className="flex absolute inset-y-0 left-0 items-center pl-3 text-red-600">
                                      <AiOutlineCheck
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>

              <h4 className="flex overflow-y-scroll flex-wrap gap-1 py-3 max-h-44 font-light">
                {tags
                  .filter((tag) => tag.attributes.group !== `genre`)
                  .map((tag) => (
                    <div
                      key={tag.attributes.name.en}
                      className="py-1 px-3 text-base text-body-alt bg-primary-red rounded-full"
                    >
                      {tag.attributes.name.en}
                    </div>
                  ))}
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
