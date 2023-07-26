import PostsList from "../../components/PostList/postsList";

async function getData() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?populate=cover`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function BlogPage() {
  const { data } = await getData();
  return (
    <div className="container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12 lg:col-span-8 mb-8">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PostsList shortPost data={data} promise={data} />
          </section>
        </main>
        <aside className=" block col-span-12 lg:col-span-4">aside</aside>
      </div>
    </div>
  );
}
