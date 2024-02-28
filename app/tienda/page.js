import { Suspense } from "react";
import ProductList from "@/src/components/ProductList/productList";
import { fetchStrapiData } from "@/src/lib/api";
import HeadSection from "@/src/components/HeadSection/HeadSection";
import ThumbList from "@/src/components/ThumbList/ThumbList";

// `${process.env.NEXT_PUBLIC_STRAPI_URL}/productos?populate=imagen&populate[0]=categoria_categoria_productos`

// async function fetchPosts() {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?populate=*`,
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

export default async function TiendaPage(props) {
  const { data: categoryproducts } = await fetchStrapiData("category-products");

  const { data: datasidebar } = await fetchStrapiData(
    `featured-sidebars/?populate=products.category_products&populate=products.cover`
  );

  //return false;

  return (
    <div className="container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12 lg:col-span-9 mb-8">
          {categoryproducts.data.map((categoria) => {
            //return false;

            return (
              <section className="mb-10">
                <HeadSection
                  titulo={categoria.attributes.title}
                  subtitulo={categoria.attributes.subtitle}
                  icon
                />
                <Suspense fallback={<p>Cargando productos...</p>}>
                  <ProductList
                    shortPost
                    filter={"category_products"}
                    categoria={categoria.attributes.slug}
                    cols={3}
                  />
                </Suspense>
              </section>
            );
          })}
        </main>

        <aside className=" block col-span-12 lg:col-span-3">
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
}
