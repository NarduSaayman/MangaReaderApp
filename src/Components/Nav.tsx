import React, { useState } from "react"; // import state

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <div className="flex justify-between items-center py-8 px-5">
      <nav>
        <section className="flex lg:hidden">
          <button
            type="button"
            className="space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block w-8 h-0.5 bg-primary-red animate-pulse" />
            <span className="block w-8 h-0.5 bg-primary-red animate-pulse" />
            <span className="block w-8 h-0.5 bg-primary-red animate-pulse" />
          </button>

          <div className={isNavOpen ? `showMenuNav` : `hideMenuNav`}>
            {` `}
            <button
              type="button"
              className="absolute top-0 right-0 py-8 px-5"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="w-8 h-8 text-primary-red animate-bounce"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <ul className="flex flex-col justify-between items-center min-h-[250px]">
              <li className="my-8 uppercase border-b border-gray-400">
                <a href="/about">About</a>
              </li>
              <li className="my-8 uppercase border-b border-gray-400">
                <a href="/portfolio">Portfolio</a>
              </li>
              <li className="my-8 uppercase border-b border-gray-400">
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="hidden space-x-8 lg:flex">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/portfolio">Portfolio</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 50%;
        height: 100vh;
        top: 0;
        right: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 20px;
        box-shadow: -5px 0 5px rgb(0 0 0 / 5%);
      }
    `}</style>
    </div>
  );
}
