//import PostsList from "../postsList";
import Image from "next/image";
import markdownToHtml from "@/app/utils/markdownToHtml";

const getPost = (id) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/posts/?filters[link]=${id}&populate=cover`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json());
};

export default async function PostPage({ params: { id } }) {
  const post = await getPost(id);
  const {
    title: titulo,
    content: contenido,
    cover: imagen,
    publishedAt,
  } = post.data[0].attributes;

  const richtext = await markdownToHtml(contenido);

  return (
    <div className="container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12 lg:col-span-8 mb-8">
          <article>
            <h2 className="title text-4xl text-slate-900 font-semibold mb-5">
              {titulo}
            </h2>
            <p className="text-xs text-slate-400 mb-4">{publishedAt}</p>

            <Image
              src={imagen.data.attributes.url}
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
          {/* <PostsList shortPost={true} /> */}
        </aside>
      </div>
    </div>
  );
}
