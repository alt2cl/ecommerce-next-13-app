"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CarritoBtn from "../CarritoBtn";

export default function Header(props) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  //const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/main-menus/?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(true);
      });
  }, []);

  function closed() {
    setOpen(false);
  }

  //console.log("data menu:", data);

  //return false;

  const datamenu = data?.data[0].attributes.Enlace;

  return (
    <>
      <div
        className="sticky top-0 z-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(0 0 0 / .8), rgb(0 0 0 / .7)), url(/img/header.jpg)",
        }}
      >
        <div className="container cont mx-auto lg:py-1 lg:flex items-center">
          <div className="flex flex-row justify-between w-full">
            <Link href="/" className="pl-4 flex justify-center">
              <Image
                className="p-6"
                src={"/img/cafemas.png"}
                width={248}
                height={56}
                alt="Logo"
              />
            </Link>
            <div className="menues flex flex-row justify-center p-5 gap-4 ">
              <div
                className={`${
                  open ? "right-0 open" : "-right-full"
                } lg:right-0 transition-all menu bg-current z-30 top-0  fixed max-w-xs min-h-screen lg:max-w-none lg:static lg:min-h-0`}
              >
                <div className="clsedbtn absolute top-4 right-4 block lg:hidden">
                  <button
                    className="closed text-white"
                    onClick={() => closed()}
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

                {datamenu && (
                  <nav
                    className={`w-80 lg:w-auto ml-auto flex flex-col lg:flex-row max-w-7xl items-right justify-between p-6 lg:px-8 gap-10 text-white`}
                  >
                    {datamenu?.map((itemMenu) => {
                      return (
                        <Link
                          href={itemMenu.enlace}
                          key={`menu-${itemMenu.id}`}
                        >
                          {itemMenu.titulo}
                        </Link>
                      );
                    })}
                  </nav>
                )}
              </div>
              <CarritoBtn />

              <div className="hamburger lg:hidden flex items-center">
                <button className="text-white" onClick={() => setOpen(true)}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
