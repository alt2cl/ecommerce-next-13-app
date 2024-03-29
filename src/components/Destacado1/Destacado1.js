import React from "react";
//import { Slide } from "react-slideshow-image";
import Image from "next/image";
import "./module.destacado1.scss";
import Link from "next/link";
import { fetchStrapiData } from "@/src/lib/api";

export default async function Destacado1({ position = 0 }) {
  const { data, error, loading } = await fetchStrapiData(
    `featured-blocks?populate[cover][fields][0]=url&populate=Links&populate[2]=Links.cover&sort=rank:asc`
  );

  //const pos = position ? position : 0;

  const datafirst = data ? data?.data[position]?.attributes : null;
  console.log("datafirst con cover?: ", datafirst);

  if (!data || error != null) {
    console.log("la data destacado 1", error);
    return false;
  }

  console.log("data del destacado 1", datafirst.rank);

  if (datafirst.rank == 0) {
    return false;
  }

  return (
    <div className="Destacado-1 container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12">
          <section
            className="mb-8 rounded-[30px] p-3 lg:p-8 lg:p-10 drop-shadow-2xl"
            // style={{
            //   backgroundImage:
            //     "radial-gradient(ellipse at 150% 175%, #ffffa2, rgb(255, 255, 255))",
            // }}
            // style={{
            //   backgroundImage:
            //     "radial-gradient(ellipse at 150% 75%, #111, #444)",
            // }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="-mt-10 lg:-mb-20 lg:-mt-20 z-0 lg:order-2 -mr-10 -ml-10">
                <Image
                  src={datafirst.cover.data.attributes.url.replace(
                    "upload/",
                    "upload/c_fill,h_600,w_600/"
                  )}
                  width={700}
                  height={600}
                />
              </div>
              <div className="flex flex-col justify-center z-10 lg:pr-20 lg:order-1">
                {/* <Link href={datafirst.url}> */}
                <h2 className="text-2xl lg:text-5xl font-semibold text-gray-800 mb-4">
                  {/* {datafirst.title} */}
                  ¡Café Recién Tostado Para Despertar Tus Sentidos!
                </h2>
                {/* </Link> */}

                <h3 className="text-gray-600 mb-4 text-2xl lg:text-4xl">
                  {/* {datafirst.subtitle} */}
                  Aroma y Sabor que Encienden Tu Día
                </h3>
                <p className="mb-10 text-gray-500">
                  {/* {datafirst.description} */}
                  Descubre nuestra selección exclusiva de granos de café,
                  tostados a la perfección. Cada taza promete una experiencia
                  inolvidable, llena de ricos sabores y aromas que revitalizan
                  tu rutina diaria.
                </p>
                <div className="grid grid-flow-col">
                  {datafirst.Links &&
                    datafirst.Links.map((item) => {
                      console.log("item link: ", item);
                      return (
                        <Link
                          key={item.url}
                          href={item.url}
                          className={
                            "rounded-lg text-center font-medium px-4 py-6  bg-primary-600 hover:bg-zinc-800 text-zinc-800 hover:text-white mr-2 leading-none"
                          }
                        >
                          {/* <Image
                            src={item.url}
                            width={800}
                            height={800}
                            style={{
                              maxWidth: "70px",
                              marginLeft: "auto",
                              marginRight: "auto",
                              marginTop: -30,
                              marginBottom: 10,
                            }}
                          /> */}
                          <span>{item.excerpt}</span>
                          <h5 className="">{item.title}</h5>
                          <h6>{item.subtitle}</h6>
                          <span className="text-xs">{item.description}</span>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
