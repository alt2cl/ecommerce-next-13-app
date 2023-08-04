import ProductList from "@/components/ProductList/productList";
import PostsList from "../../components/PostList/postsList";
import ThumbList from "@/components/ThumbList/ThumbList";

async function getData() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?populate=cover`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getDataSidebar() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-sidebars/?populate=products.category_products&populate=products.cover`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function BlogPage() {
  const { data } = await getData();

  const { data: datasidebar } = await getDataSidebar();
  //console.log("datasidebar_", datasidebar[0].attributes.products);

  return (
    <div className="container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12 lg:col-span-8 mb-8">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PostsList shortPost data={data} promise={data} />
          </section>
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
