import Image from "next/image";
import Link from "next/link";

export default async function ProductList({ shortPost, promise }) {
  const data = await promise;
  return (
    <>
      {data.map((post) => {
        const item = post.attributes;
        const {
          titulo,
          descripcion,
          publishedAt,
          url,
          imagen,
          precio,
          categorias,
        } = item;

        return (
          <div
            key={`product-${post.id}`}
            className={"flex flex-col gap-3 mb-5 lg:mb-16"}
          >
            <div className="flex justify-center">
              <Image
                src={
                  imagen.data[0].attributes.formats.small
                    ? imagen.data[0].attributes.formats.small.url
                    : imagen.data[0].attributes.url
                }
                alt={`imagen de ${titulo}`}
                width={imagen.data[0].attributes.width}
                height={imagen.data[0].attributes.height}
                className={"rounded-xl"}
              ></Image>
            </div>
            <div className="flex flex-col col-span-4">
              <h3 className="text-md mb-3 font-semibold text-slate-900">
                {titulo}
              </h3>
              <p
                className={`${
                  shortPost ? "lineclamp-4 mb-5" : "mb-5"
                } text-slate-500 text-sm `}
              >
                {descripcion}
              </p>
              <p className="text-md text-slate-800 font-medium mb-6">
                ${precio}
              </p>

              <Link
                href={`/tienda/${categorias?.data[0]?.attributes.titulo}/${url}`}
                className="rounded-md text-center p-2 bg-orange-500 hover:bg-slate-900 text-white"
              >
                Ir al producto...
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
