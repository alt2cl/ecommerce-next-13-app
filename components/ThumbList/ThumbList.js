"use client";
//import Image from "next/image";
import Link from "next/link";
import HeadSection from "@/components/HeadSection/HeadSection";
import { AdvancedImage } from "@cloudinary/react";
import cl from "@/components/Cloudinary/cloudinaryConfig";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

export default function ProductList({ promise, headtext }) {
  const data = promise;

  //console.log("data awaite_:", data);

  //return false;

  return (
    <>
      <HeadSection titulo={headtext} />
      {data?.map((post) => {
        const item = post.attributes;
        const {
          title: titulo,
          description: descripcion,
          publishedAt,
          slug: url,
          cover: imagen,
          price: precio,
          category_products: categorias,
        } = item;

        return (
          <Link
            key={`product-${post.id}`}
            href={`/tienda/${categorias?.data[0]?.attributes.slug}/${url}`}
            className={
              "max-w-xs rounded overflow-hidden shadow-lg m-4 flex gap-3 p-3 bg-white"
            }
          >
            <div className="w-1/3">
              {imagen.data ? (
                <AdvancedImage
                  cldImg={cl
                    .image(imagen.data.attributes.hash)
                    .resize(
                      fill().width(350).height(350).gravity(autoGravity())
                    )}
                  className={"rounded-md"}
                />
              ) : (
                // <Image
                //   src={
                //     imagen.data.attributes.formats.small
                //       ? imagen.data.attributes.formats.small.url
                //       : imagen.data.attributes.url
                //   }
                //   alt={`imagen de ${titulo}`}
                //   width={imagen.data.attributes.width}
                //   height={imagen.data.attributes.height}
                //   className={"rounded-xl"}
                // ></Image>
                "sin imagen"
              )}
            </div>
            <div className="w-2/3 flex flex-col col-span-8">
              <h3 className="text-md mb-3 font-semibold text-slate-900">
                {titulo}
              </h3>
              <p className={` text-slate-500 text-sm `}>{descripcion}</p>
              <p className="text-md text-slate-800 font-medium mb-6">
                ${precio}
              </p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
