//import ProductList from "@/components/ProductList/productList";
import HeadSection from "@/src/components/HeadSection/HeadSection";
import PostsList from "@/src/components/PostList/postsList";
import ThumbList from "@/src/components/ThumbList/ThumbList";
import { fetchStrapiData } from "@/src/lib/api";

// async function getData() {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?populate=cover&sort=rank:asc`,
//       { cache: "no-store" }
//     );
//     if (!response.ok) {
//       throw new Error(`API call failed with status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Fetching post failed:", error);
//     // Manejo adicional del error o re-throw
//     throw error;
//   }
// }

// async function getDataSidebar() {
//   let res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-sidebars/?populate=products.category_products&populate=products.cover`
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

export default async function BlogPage() {
  //const { data } = await getData();

  const { data } = await fetchStrapiData("posts?populate=cover&sort=rank:asc");
  const { data: datasidebar } = await fetchStrapiData(
    "featured-sidebars/?populate=products.category_products&populate=products.cover"
  );

  //const { data: datasidebar } = await getDataSidebar();
  //console.log("datasidebar_", datasidebar[0].attributes.products);

  if (data.data && datasidebar.data) {
    return (
      <div className="container px-4 pt-9">
        <div className="grid lg:grid-cols-12 lg:gap-12">
          <main className="col-span-12 lg:col-span-8 mb-8">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PostsList shortPost data={data.data} promise={data.data} />
            </section>
          </main>
          <aside className=" block col-span-12 lg:col-span-4">
            {datasidebar?.data.map((item) => {
              return (
                <ThumbList
                  headtext={item.attributes.title}
                  promise={item.attributes.products.data}
                  truncate
                />
              );
            })}
          </aside>
        </div>
      </div>
    );
  } else {
    <h3>Cargando</h3>;
  }
}
