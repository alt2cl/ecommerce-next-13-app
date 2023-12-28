import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/es";

export default async function PostsList({ shortPost, promise }) {
  const data = await promise;
  return (
    <>
      {data?.map((post) => {
        const item = post.attributes;
        const {
          title: titulo,
          subtitle: subtitulo,
          description: descripcion,
          publishedAt,
          slug: link,
          cover: imagen,
          content: contenido,
        } = item;

        const formattedDate = dayjs(publishedAt)
          .locale("es")
          .format("D [de] MMMM YYYY");

        return (
          <article key={`post-${post.id}`} className="mb-10">
            <div>
              <Link href={`/blog/${link}`}>
                <h3 className="title text-3xl text-slate-900 font-semibold mb-5">
                  {titulo}
                </h3>
              </Link>
              <p className="text-xs text-slate-400 mb-3">{formattedDate}</p>
              {imagen.data ? (
                <Link href={`/blog/${link}`} className="rounded">
                  <Image
                    src={
                      imagen.data.attributes.formats != null
                        ? imagen.data.attributes.formats.medium.url
                        : imagen.data.attributes.url
                    }
                    alt={`imagen de articulo ${titulo}`}
                    width={imagen.data.attributes.width}
                    height={imagen.data.attributes.height}
                    className="mb-3 rounded"
                  ></Image>
                </Link>
              ) : null}
            </div>
            <div>
              <p
                className={`${
                  shortPost ? "lineclamp-4" : ""
                } text-slate-500 text-sm`}
              >
                {contenido}
              </p>
            </div>
          </article>
        );
      })}
    </>
  );
}
