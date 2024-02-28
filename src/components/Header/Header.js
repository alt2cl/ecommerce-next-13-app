import { Suspense } from "react";
import Link from "next/link";
import CarritoBtn from "@/src/components/Header/CarritoBtn";

import Menu from "@/src/components/Header/Menu";
import BurgerBtn from "@/src/components/Header/BurgerBtn";
import Image from "next/image";
import SocialLinks from "@/src/components/SocialLinks/SocialLinks";

import logo from "@/public/img/cafemas.png";
import { fetchStrapiData } from "@/src/lib/api";

export default async function Header(props) {
  const { data } = await fetchStrapiData(`menus/?populate=sociallinks`);

  // if (!data) {
  //   return false;
  // }

  return (
    <>
      <div className="sticky top-0 z-30 lg:min-h-[88px] py-4 lg:py-1 bg-gray-900">
        <div className="container cont mx-auto lg:py-1 lg:flex items-center">
          <div className="flex flex-row justify-between w-full">
            <Link href="/" className="pl-4 grid content-center lg:pt-0">
              <Image src={logo} width={170} height={70} alt={"Cafe Más"} />
            </Link>
            <div className="menues flex flex-row justify-center p-3 gap-4 ">
              <div className="hidden lg:flex">
                <Menu />
              </div>
              <CarritoBtn />

              <div className="relative">
                <BurgerBtn
                  menu={<Menu />}
                  dataSocial={
                    <SocialLinks data={data.data[0].attributes.sociallinks} />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
