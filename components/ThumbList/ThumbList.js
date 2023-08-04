import Image from "next/image";
import Link from "next/link";
import HeadSection from "@/components/HeadSection/HeadSection";

export default async function ProductList({ promise, headtext }) {
  const data = await promise;

  console.log("data awaite_:", data);

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
              "flex gap-3 mb-5 lg:mb-5 bg-white transition hover:shadow-xl p-2 rounded-xl"
            }
          >
            <div className="flex justify-center max-w-[120px] lg:max-w-[160px] sm:block sm:basis-40">
              {imagen.data ? (
                <Image
                  src={
                    imagen.data.attributes.formats.small
                      ? imagen.data.attributes.formats.small.url
                      : imagen.data.attributes.url
                  }
                  alt={`imagen de ${titulo}`}
                  width={imagen.data.attributes.width}
                  height={imagen.data.attributes.height}
                  className={"rounded-xl"}
                ></Image>
              ) : (
                "sin imagen"
              )}
            </div>
            <div className="flex flex-col col-span-4">
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
