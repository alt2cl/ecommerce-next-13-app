"use client";
import { useState } from "react";

export default function BurgerBtn({ menu, dataSocial }) {
  let [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="hamburger lg:hidden flex items-center">
        <button className="text-white" onClick={() => handleClose()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div
        className={`
                ${
                  open
                    ? "right-0 open bg-zinc-900 lg:bg-inherit"
                    : "-right-full"
                } 
                lg:right-0 transition-all menu  z-30 top-0  fixed max-w-xs min-h-screen lg:max-w-none lg:static lg:min-h-0`}
      >
        <div className="clsedbtn absolute top-4 right-4 block lg:hidden">
          <button
            className="closed text-white font-semibold py-1"
            onClick={() => handleClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col lg:hidden">
          <div>
            <ul className="mt-7 mb-10 pl-7 flex gap-6 md:gap-8">
              {dataSocial}
            </ul>
          </div>

          <div onClick={() => setOpen(false)}>{menu}</div>
        </div>
      </div>
    </>
  );
}
