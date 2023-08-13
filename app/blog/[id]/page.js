//import PostsList from "../postsList";
import Image from "next/image";
import markdownToHtml from "@/app/utils/markdownToHtml";
import dayjs from "dayjs";
import "dayjs/locale/es";
import ThumbList from "@/components/ThumbList/ThumbList";

const getPost = (id) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/posts/?filters[slug]=${id}&populate=cover`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json());
};

async function getDataSidebar() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-sidebars/?populate=products.category_products&populate=products.cover`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function PostPage({ params: { id } }) {
  const post = await getPost(id);
  const {
    title: titulo,
    content: contenido,
    cover: imagen,
    publishedAt,
  } = post.data[0].attributes;

  const { data: datasidebar } = await getDataSidebar();

  const richtext = await markdownToHtml(contenido);
  const formattedDate = dayjs(publishedAt)
    .locale("es")
    .format("D [de] MMMM YYYY");

  return (
    <div className="container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12 lg:col-span-8 mb-8">
          <article>
            <h2 className="title text-4xl text-slate-900 font-semibold mb-5">
              {titulo}
            </h2>
            <p className="text-xs text-slate-400 mb-4">{formattedDate}</p>

            <Image
              src={
                imagen.data.attributes.formats.medium.url
                  ? imagen.data.attributes.formats.medium.url
                  : imagen.data.attributes.url
              }
              alt={`Imagen ${titulo}`}
              width={800}
              height={450}
              className="mb-3 rounded"
            />

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
          {datasidebar?.map((item) => {
            return (
              <ThumbList
                headtext={item.attributes.title}
                promise={item.attributes.products.data}
              />
            );
          })}
        </aside>
      </div>
    </div>
  );
}
