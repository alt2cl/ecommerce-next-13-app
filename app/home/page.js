//"use client";

import { Suspense, lazy } from "react";
import Slider from "@/src/components/Slider/Slider";
//import ProductList from "@/components/ProductList/productList";
import HeadSection from "@/src/components/HeadSection/HeadSection";
import AttributesCard from "@/src/components/AtributtesCard/AttributesCard";
import { fetchStrapiData } from "@/src/lib/api";

const ProductList = lazy(() =>
  import("@/src/components/ProductList/productList")
);

export default async function Home() {
  //const { data: dSlider } = await getDataSlider();
  const { data: dSlider } = await fetchStrapiData(
    `sliders?populate=cover&sort=rank:asc`
  );

  const { data: dCategories } = await fetchStrapiData(
    `featured-categories/?sort=rank:asc`
  );

  //en esta funcion el prop "slug" es un resultado de un map desde un fetch anterior
  async function getProductListCard(slug) {
    // const { data } = await getListProducts(slug);
    const { data } = await fetchStrapiData(
      `products?populate=*&filters[featured_categories][slug][$contains]=${slug}`
    );
    return <ProductList shortPost promise={data} />;
  }

  async function getAttrList(pos) {
    const { data, error, loading } = await fetchStrapiData(
      "featured-attributes/?populate=atribute&populate=atribute.cover&sort=rank:asc"
    );

    if (data?.data[pos]) {
      return <AttributesCard data={data.data[pos]} />;
    }

    if (error) {
      console.log("error fetch getAttrList: "), error;
    }
  }

  return (
    <main>
      {dSlider && <Slider promise={dSlider} />}

      <div className="container px-4 pt-9">
        <div className="grid lg:grid-cols-12 lg:gap-12">
          <main className="col-span-12">
            <section className="mb-8">
              <Suspense fallback={<p>Cargando atributos...</p>}>
                {getAttrList(0)}
              </Suspense>
            </section>

            {dCategories.data.map((categoria) => {
              return (
                <section key={`section-${categoria.id}`} className="mb-8">
                  <HeadSection
                    titulo={categoria.attributes.title}
                    subtitulo={categoria.attributes.subtitle}
                  />

                  <div className="grid  grid-cols-2 lg:grid-cols-4 gap-6">
                    <Suspense fallback={<p>Cargando productos...</p>}>
                      {getProductListCard(categoria.attributes.slug)}
                    </Suspense>
                  </div>
                </section>
              );
            })}

            {getAttrList(1) ? (
              <section className="mb-8">
                <Suspense fallback={<p>Cargando atributos...</p>}>
                  {getAttrList(1)}
                </Suspense>
              </section>
            ) : null}

            {getAttrList(2) ? (
              <section className="mb-8">
                <Suspense fallback={<p>Cargando atributos...</p>}>
                  {getAttrList(2)}
                </Suspense>
              </section>
            ) : null}

            {getAttrList(3) ? (
              <section className="mb-8">
                <Suspense fallback={<p>Cargando atributos...</p>}>
                  {getAttrList(3)}
                </Suspense>
              </section>
            ) : null}
          </main>
        </div>
      </div>
    </main>
  );
}
