import Image from "next/image";
import Link from "next/link";

export default async function PostsList({ shortPost, promise }) {
  const data = await promise;
  return (
    <>
      {data.map((post) => {
        const item = post.attributes;
        const { titulo, publishedAt, url, imagen, contenido } = item;
        return (
          <article key={`post-${post.id}`} className="mb-10">
            <div>
              <Link href={`/blog/${url}`}>
                <h3 className="title text-3xl text-slate-900 font-semibold mb-5">
                  {titulo}
                </h3>
              </Link>
              <p className="text-xs text-slate-400 mb-3">{publishedAt}</p>
              {imagen && (
                <Link href={`/blog/${url}`} className="rounded">
                  <Image
                    src={
                      imagen.data.attributes.formats.medium
                        ? imagen.data.attributes.formats.medium.url
                        : imagen.data.attributes.url
                    }
                    alt={`imagen de articulo ${titulo}`}
                    width={800}
                    height={400}
                    className="mb-3 rounded"
                  ></Image>
                </Link>
              )}
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
