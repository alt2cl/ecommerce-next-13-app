//"use client";

import { Suspense, lazy } from "react";
import Slider from "@/src/components/Slider/SliderImg";
import Destacado1 from "@/src/components/Destacado1/Destacado1";
//import ProductList from "@/components/ProductList/productList";
import HeadSection from "@/src/components/HeadSection/HeadSection";
import AttributesCard from "@/src/components/AtributtesCard/AttributesCard";
import { fetchStrapiData } from "@/src/lib/api";
import BannerBlock from "@/src/components/BannerBlock/BannerBlock";
import BannerBlock2 from "@/src/components/BannerBlock/BannerBlock2";

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
      <Suspense fallback={<p>Cargando...</p>}>
        <Destacado1 position={0} />
      </Suspense>

      <Suspense
        fallback={
          <div style={{ height: 400, backgroundColor: "#333", width: "100%" }}>
            Cargando slider...
          </div>
        }
      >
        <Slider data={dSlider} />
      </Suspense>

      <div className="container px-4 pt-9">
        <div className="grid lg:grid-cols-12 lg:gap-12">
          <main className="col-span-12">
            <section className="mb-8">
              <Suspense fallback={<p>Cargando atributos...</p>}>
                {getAttrList(0)}
              </Suspense>
            </section>
            <section className="mb-20">
              <BannerBlock2 />
            </section>

            {dCategories.data.map((categoria) => {
              return (
                <section key={`section-${categoria.id}`} className="mb-8">
                  <HeadSection
                    titulo={categoria.attributes.title}
                    subtitulo={categoria.attributes.subtitle}
                  />

                  <Suspense fallback={<p>Cargando productos...</p>}>
                    <ProductList
                      shortPost
                      filter={"featured_categories"}
                      categoria={categoria.attributes.slug}
                    />
                  </Suspense>
                </section>
              );
            })}

            <section className="mb-20">
              <BannerBlock />
            </section>

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
