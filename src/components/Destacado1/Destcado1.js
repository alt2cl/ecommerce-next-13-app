import React from "react";
//import { Slide } from "react-slideshow-image";
import Image from "next/image";
import "./module.destacado1.scss";
import Link from "next/link";
import { fetchStrapiData } from "@/src/lib/api";

export default async function Destacado1() {
  const { data } = await fetchStrapiData(
    `sliders?populate=cover&sort=rank:asc`
  );

  const datafirst = data.data[0].attributes;

  //  console.log("data primer slide", datafirst);

  return (
    <div className="container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12">
          <section
            className="mb-8 rounded-[30px] p-8 lg:p-10 drop-shadow-2xl"
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
              <div className="-mt-10 lg:-mt-20 lg:-mb-10 z-0 lg:order-2 -mr-10 -ml-10">
                <Image
                  src="/img/cafemasdestacado.png"
                  width={800}
                  height={800}
                />
              </div>
              <div className="flex flex-col justify-center z-10 lg:px-20 lg:order-1">
                <Link href={datafirst.url}>
                  <h2 className="text-2xl lg:text-5xl font-semibold text-gray-800 mb-4">
                    {/* {datafirst.title} */}
                    ¡Café Recién Tostado Para Despertar Tus Sentidos!
                  </h2>
                </Link>

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
                <div className="flex">
                  <Link
                    href={datafirst.url}
                    className={
                      "rounded-lg text-center font-medium px-4 py-2 pb-4 bg-primary-600 hover:bg-zinc-800 text-white mr-2 leading-none"
                    }
                  >
                    <Image
                      src="/img/cafemasdestacado.png"
                      width={800}
                      height={800}
                      style={{
                        maxWidth: "70px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: -30,
                        marginBottom: 10,
                      }}
                    />
                    <h5 className="mb-3">Explora Nuestros Sabores</h5>
                    <span className="text-xs 		">
                      Lo mejor de Brasil, Colombia y Perú escoge tu favorito
                    </span>
                  </Link>
                  <Link
                    href={datafirst.url}
                    className={
                      "rounded-md text-center font-medium px-4 py-2 bg-primary-600 hover:bg-zinc-800 text-white mr-2 leading-none"
                    }
                  >
                    {/* {datafirst.titlebutton} */}
                    <h5 className="mb-3">El regalo ideal esta aquí!</h5>
                    <span className="text-xs	">
                      Conoce nuestros packs de café y accesorios.
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
