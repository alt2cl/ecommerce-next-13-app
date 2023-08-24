"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import CarritoBtn from "../CarritoBtn";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { useTheme } from "@/context/ThemeContext";

export default function Header(props) {
  const [data, setData] = useState(null);
  const [dataConfig, setDataConfig] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const values = useTheme();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/menus/?populate=*`)
      .then((res) => res.json())
      .then(
        (data) => {
          setData(data);
        } /*, setLoading(false)*/
      );
  }, []);

  function closed() {
    setOpen(false);
  }

  const datamenu = data ? data.data[0].attributes.items : null;

  const logo = values.dataTheme?.data.attributes.logosite?.data?.attributes.url;
  const logowidth =
    values.dataTheme?.data.attributes.logosite?.data?.attributes.width;
  const logoheight =
    values.dataTheme?.data.attributes.logosite?.data?.attributes.height;

  return (
    <>
      <div
        className="sticky top-0 z-30 lg:min-h-[88px] py-4 lg:py-1"
        style={{
          backgroundColor: values.dataTheme?.data.attributes.bgmenu
            ? values.dataTheme?.data.attributes.bgmenu
            : "#222",

          //backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%23694525' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      >
        <div className="container cont mx-auto lg:py-1 lg:flex items-center">
          <div className="flex flex-row justify-between w-full">
            <Link href="/" className="pl-4 grid content-center">
              {logo && (
                <img
                  src={logo}
                  width={180}
                  height={42}
                  alt={values.dataTheme?.data.attributes.titlesite}
                />
              )}
            </Link>
            <div className="menues flex flex-row justify-center p-3 gap-4 ">
              <div
                className={`${
                  open
                    ? "right-0 open bg-zinc-900 lg:bg-inherit"
                    : "-right-full"
                } lg:right-0 transition-all menu  z-30 top-0  fixed max-w-xs min-h-screen lg:max-w-none lg:static lg:min-h-0`}
              >
                <div className="clsedbtn absolute top-4 right-4 block lg:hidden">
                  <button
                    className="closed text-white font-semibold py-1"
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

                {open && (
                  <div>
                    <ul className="mt-7 mb-10 pl-7 flex gap-6 md:gap-8">
                      <Suspense className="text-white">
                        <SocialLinks />
                      </Suspense>
                    </ul>
                  </div>
                )}

                {datamenu && (
                  <ul
                    className={`w-80 lg:w-auto ml-auto flex flex-col lg:flex-row max-w-7xl items-right justify-between p-4 lg:px-8 gap-10  text-white`}
                    style={{
                      color: values.dataTheme?.data.attributes.fontcolor
                        ? values.dataTheme?.data.attributes.fontcolor
                        : null,
                    }}
                  >
                    {datamenu?.map((itemMenu) => {
                      return (
                        <li key={`main-menu-${itemMenu.id}`}>
                          <Link href={itemMenu.url} onClick={() => closed()}>
                            {itemMenu.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
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
