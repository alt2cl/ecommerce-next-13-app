import Image from "next/image";
import markdownToHtml from "@/src/utils/markdownToHtml";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { fetchStrapiData } from "@/src/lib/api";

// const getPost = (dinamicpage) => {
//   return fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/pages/?filters[slug]=${dinamicpage}&populate=cover`
//     //   { next: { revalidate: 60 } }
//   ).then((res) => res.json());
// };

export default async function PostPage({ params: { dinamicpage } }) {
  //console.log("el value de extra page", dinamicpage);
  //const data = await getPost(dinamicpage);

  const { data } = await fetchStrapiData(
    `pages/?filters[slug]=${dinamicpage}&populate=cover`
  );

  console.log("////////////////////dinamicpage ", data);

  // if (!data) {
  //   return <h3>Sin datos</h3>;
  // }

  const post = data?.data.length > 0 ? data?.data[0].attributes : null;

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

    console.log("la imagen:", imagen);

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
  } else {
    return (
      <div
        style={{
          padding: "1rem",
          textAlign: "center",
          height: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>404 - Página No Encontrada</h1>
        <p>Oops! La página que buscas no existe.</p>
      </div>
    );
  }
}
