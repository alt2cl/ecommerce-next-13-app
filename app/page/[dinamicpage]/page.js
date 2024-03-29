import Image from "next/image";
import markdownToHtml from "@/src/utils/markdownToHtml";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { fetchStrapiData } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function PostPage({ params: { dinamicpage } }) {
  const { data } = await fetchStrapiData(
    `pages/?filters[slug]=${dinamicpage}&populate=cover`
  );

  const post = data?.data?.length > 0 ? data?.data[0].attributes : null;

  if (!post) {
    notFound();
  }

  if (data && post) {
    const {
      titlesection,
      titlepage: titulo,
      subtitle,
      description,
      content: contenido,
      cover: imagen,
      publishedAt,
    } = data.data[0].attributes;

    const richtext = await markdownToHtml(contenido);
    const formattedDate = dayjs(publishedAt)
      .locale("es")
      .format("D [de] MMMM YYYY");

    return (
      <div className="container px-4 pt-12 pb-20">
        <div className="grid lg:grid-cols-12 lg:gap-12">
          <main className="col-span-12 lg:col-span-8 mb-8">
            <h2 className="title text-4xl text-slate-900 font-semibold mb-5">
              {titulo}
            </h2>
            {subtitle && <h3 className="text-3xl mb-5">{subtitle}</h3>}

            {description && <h4 className="text-1xl mb-5">{description}</h4>}

            <p className="text-xs text-slate-400 mb-4">{formattedDate}</p>

            {imagen.data && (
              <Image
                src={
                  imagen.data.attributes.formats.medium.url
                    ? imagen.data.attributes.formats.medium.url
                    : imagen.data.attributes.url
                }
                alt={`Imagen ${titulo}`}
                width={1200}
                height={450}
                className="mb-3 rounded"
              />
            )}

            <div className="text-slate-700 text-md">
              {richtext && (
                <div
                  className="prose prose-slate"
                  dangerouslySetInnerHTML={{ __html: richtext }}
                ></div>
              )}
            </div>
          </main>
        </div>
      </div>
    );
  }
}
