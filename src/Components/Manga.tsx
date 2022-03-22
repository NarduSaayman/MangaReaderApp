import React, { useState, Fragment } from "react";
import { useQuery } from "react-query";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IMangaChapterData } from "../Interfaces/Chapter";
import { ICoverData } from "../Interfaces/Cover";
import { IMangaData } from "../Interfaces/Manga";
import { IMangaVolumes } from "../Interfaces/MangaVolumes";
import { IMangaPagesRoot } from "../Interfaces/Pages";
import {
  fetchChapterByIDPromise,
  fetchChapterPagesByIDPromise,
  fetchCoverByIDPromise,
  fetchMangasByTitlePromise,
  fetchMangaVolumesByIDPromise,
} from "../Services/MangaDexApi";

type PagesProps = {
  baseUrl: string;
  pages: string[];
  hash: string;
};

function Pages(props: PagesProps) {
  const { baseUrl, pages, hash } = props;

  const hasPages = baseUrl !== `` && pages[0] !== `` && hash !== ``;

  return (
    <>
      {hasPages && (
        <div>
          {pages.map((page) => (
            <img key={page} src={`${baseUrl}/data/${hash}/${page}`} alt="" />
          ))}
        </div>
      )}
      {!hasPages && <div>Loading...</div>}
    </>
  );
}

type MangaProps = {
  title: string;
  styleType: string;
};

export default function Manga(props: MangaProps) {
  const { title, styleType } = props;
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Get Manga
  const mangaQuery = useQuery<IMangaData[], Error>(title, () =>
    fetchMangasByTitlePromise(title, 1),
  );

  const mangaData = mangaQuery.data;

  const mangaID = mangaData?.[0]?.id;

  // Cover ID for next query
  const coverID =
    mangaData?.[0].relationships.find(({ type }) => type === `cover_art`)?.id ||
    ``;

  const altTitleEN =
    mangaData?.[0].attributes.altTitles.find((lang) => lang.en)?.en || ``;

  // Get Cover from manga
  const coverQuery = useQuery<ICoverData, Error>(
    [`cover`, coverID],
    () => fetchCoverByIDPromise(coverID),
    { enabled: !!coverID && coverID !== `` },
  );

  const coverData = coverQuery.data;

  // Get Volume
  const mangaVolumeQuery = useQuery<IMangaVolumes, Error>(
    [`manga volumes`, mangaID],
    () => fetchMangaVolumesByIDPromise(mangaData?.[0]?.id ?? ``),
    { enabled: !!mangaData?.[0]?.id },
  );

  const mangaVolumeData = mangaVolumeQuery.data;

  // found bug here need help volume and chapter inside volume can have a key of none
  console.log(mangaVolumeData);

  // get first item in volumes
  const volumeIndex = mangaVolumeData
    ? +Object.keys(mangaVolumeData.volumes)[0] // access first item in volumes array, +is to covert return to number
    : -1; // return -1 if item at first index couldnt be returned

  // get first item in chapters from volume index
  const chapterIndex = mangaVolumeData
    ? +Object.keys(mangaVolumeData.volumes[volumeIndex].chapters)[0] // access first item in chapters array, +is to covert return to number
    : -1; // return -1 if item at first index couldnt be returned

  // set chapter ID to first chapter of first volume
  const chapterID =
    mangaVolumeData?.volumes?.[volumeIndex]?.chapters?.[chapterIndex]?.id ?? ``;

  // Get First Chapter of First Volume
  const mangaChapterQuery = useQuery<IMangaChapterData, Error>(
    [`manga chapter`, chapterID],
    () => fetchChapterByIDPromise(chapterID),
    {
      enabled: !!chapterID,
    },
  );

  const mangaChapterData = mangaChapterQuery.data;

  // Get Pages from Chapter
  const mangaPagesQuery = useQuery<IMangaPagesRoot, Error>(
    [`manga chapter pages`, mangaChapterData?.id],
    () => fetchChapterPagesByIDPromise(mangaChapterData?.id ?? ``),
    {
      enabled: !!mangaChapterData?.id,
    },
  );

  const mangaPagesData = mangaPagesQuery.data;

  const isLoading = mangaQuery.status === `loading`;
  const isError = mangaQuery.isError && mangaData === undefined;
  const isSuccess =
    mangaQuery.isSuccess &&
    coverQuery.isSuccess &&
    mangaVolumeQuery.isSuccess &&
    mangaChapterQuery.isSuccess &&
    mangaPagesQuery.isSuccess;

  return (
    <>
      {isLoading && <div>`Loading...`;</div>}
      {isError && (
        <div>{`An error has occurred: ${mangaQuery.error?.message}`}</div>
      )}
      {isSuccess && styleType === `card` && (
        <div>
          <div>
            <button type="button" onClick={openModal}>
              <h2 className="text-4xl">{mangaData?.[0].attributes.title.en}</h2>
              <img
                src={`https://uploads.mangadex.org/covers/${mangaData?.[0].id}/${coverData?.attributes.fileName}`}
                alt={`${altTitleEN} Cover`}
              />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                // eslint-disable-next-line react/jsx-no-bind
                onClose={closeModal}
              >
                <div className="min-h-screen text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-slate-900/70" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-3xl h-max overflow-y-scroll text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                      <div className="flex justify-end sticky top-0">
                        <button
                          type="button"
                          className="inline-flex justify-center m-4 text-3xl font-medium text-red-900 bg-red-100 border border-transparent rounded-full hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                          onClick={closeModal}
                        >
                          <AiOutlineCloseCircle />
                        </button>
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium p-6 text-center leading-6 text-gray-900"
                      >
                        {mangaData?.[0].attributes.title.en}
                        <div className="font-light text-lg">{altTitleEN}</div>
                      </Dialog.Title>
                      <div className="mt-2 h-screen">
                        <Pages
                          baseUrl={mangaPagesData?.baseUrl ?? ``}
                          pages={mangaPagesData?.chapter.data ?? [``]}
                          hash={mangaPagesData?.chapter.hash ?? ``}
                        />
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      )}
    </>
  );
}
