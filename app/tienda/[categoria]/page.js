import { Suspense } from "react";

import HeadSection from "@/src/components/HeadSection/HeadSection";
import ProductList from "@/src/components/ProductList/productList";
import { fetchStrapiData } from "@/src/lib/api";
import ThumbList from "@/src/components/ThumbList/ThumbList";

export default async function CategoriaPage({ params: { categoria } }) {
  const { data: datasidebar } = await fetchStrapiData(
    "featured-sidebars/?populate=products.category_products&populate=products.cover"
  );
  return (
    <div className="container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12 lg:col-span-8 mb-8">
          <section>
            <HeadSection
              titulo={categoria}
              // subtitulo={categoria.attributes.subtitle}
              icon
            />
            <div className="grid  grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={<p>Cargando productos...</p>}>
                <ProductList
                  shortPost
                  filter={"category_products"}
                  categoria={categoria}
                />
              </Suspense>
            </div>
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
}
