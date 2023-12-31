//import PostsList from "../postsList";
import Image from "next/image";
import markdownToHtml from "@/src/utils/markdownToHtml";
import dayjs from "dayjs";
import "dayjs/locale/es";
import ThumbList from "@/src/components/ThumbList/ThumbList";
import { fetchStrapiData } from "@/src/lib/api";

export default async function PostPage({ params: { id } }) {
  //const post = await getPost(id);

  const { data: post } = await fetchStrapiData(
    `posts/?filters[slug]=${id}&populate=cover`
  );

  const { data: datasidebar } = await fetchStrapiData(
    `featured-sidebars/?populate=products.category_products&populate=products.cover`
  );

  //return false;

  const {
    title: titulo,
    subtitle,
    description,
    content: contenido,
    cover: imagen,
    publishedAt,
  } = post.data[0].attributes;

  // const { data: datasidebar } = await getDataSidebar();

  const richtext = await markdownToHtml(contenido);
  const formattedDate = dayjs(publishedAt)
    .locale("es")
    .format("D [de] MMMM YYYY");

  return (
    <div className="container px-4 pt-12">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12 lg:col-span-8 mb-8">
          <article>
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
          </article>
        </main>
        <aside className=" block col-span-12 lg:col-span-4">
          {datasidebar?.data.map((item) => {
            return (
              <ThumbList
                headtext={item.attributes.title}
                promise={item.attributes.products.data}
                key={item.id}
              />
            );
          })}
        </aside>
      </div>
    </div>
  );
}
