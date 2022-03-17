import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useQuery } from "react-query";
import { IMangaVolumes, IVolume } from "../Interfaces/MangaVolumes";
import { IMangaPagesRoot } from "../Interfaces/Pages";
import {
  fetchChapterPagesByIDPromise,
  fetchMangaVolumesByIDPromise,
} from "../Services/MangaDexApi";

type PagesProps = {
  mangaID: string;
  title: string;
  altTitleEN: string;
  coverFilename: string;
};

export default function Modal(props: PagesProps) {
  const { mangaID, title, altTitleEN, coverFilename } = props;
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Get Volume
  const mangaVolumeQuery = useQuery<IMangaVolumes, Error>(
    [`manga volumes`, mangaID],
    () => fetchMangaVolumesByIDPromise(mangaID),
    { enabled: !!mangaID && mangaID !== `` },
  );

  const mangaVolumeData = mangaVolumeQuery.data;

  const Volumes: IVolume[] = mangaVolumeData
    ? Object.values(mangaVolumeData?.volumes).filter(
        (volume) => volume.volume !== `none`,
      )
    : [];

  const volumesWithChap: IVolume[] = [];

  Volumes.map((volume) =>
    volumesWithChap.push({
      volume: volume.volume,
      count: volume.count,
      chapters: Object.values(volume.chapters).filter(
        (chapter) =>
          chapter.chapter !== `none` || !!chapter !== undefined || null,
      ),
    }),
  );

  const firstChapID = volumesWithChap?.[0]?.chapters?.[0]?.id;

  // Get Pages from Chapter
  const mangaPagesQuery = useQuery<IMangaPagesRoot, Error>(
    [`manga chapter pages`, firstChapID],
    () => fetchChapterPagesByIDPromise(firstChapID),
    {
      enabled: !!firstChapID,
    },
  );

  const mangaPagesData = mangaPagesQuery.data;

  const pages = mangaPagesData?.chapter?.data ?? [``];
  const hash = mangaPagesData?.chapter?.hash ?? ``;
  const baseUrl = mangaPagesData?.baseUrl ?? ``;

  const hasPages = baseUrl !== `` || pages[0] !== `` || hash !== ``;

  return (
    <>
      {hasPages && (
        <div>
          <button type="button" onClick={openModal}>
            <h2 className="text-4xl">{title}</h2>
            <img
              src={`https://uploads.mangadex.org/covers/${mangaID}/${coverFilename}`}
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
                      {title}
                      <div className="font-light text-lg">{altTitleEN}</div>
                    </Dialog.Title>
                    <div className="mt-2 h-screen">
                      {pages.map((page) => (
                        <img
                          key={page}
                          src={`${baseUrl}/data/${hash}/${page}`}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
      ;
    </>
  );
}
