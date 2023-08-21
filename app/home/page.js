//"use client";

import { Suspense } from "react";
import Slider from "@/components/Slider/Slider";
import ProductList from "@/components/ProductList/productList";
import HeadSection from "@/components/HeadSection/HeadSection";
import AttributesCard from "@/components/AtributtesCard/AttributesCard";
//import useFetch from "./api/strapi/useFetch";
//import SsrCarousel from "@/components/SsrCarousel/SsrCarousel";

async function getDataSlider() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/sliders?populate=cover`
      //,{ next: { revalidate: 600 } }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: "Error fetching data",
      },
    };
  }
}

async function getListCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-categories/?populate=?sort=order`
    //,{ next: { revalidate: 600 } }
  );
  return res.json();
}

async function getListProducts(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?populate=*&filters[featured_categories][slug][$contains]=${slug}`
    //,{ next: { revalidate: 300 } }
  );
  return res.json();
}

async function getListAttributes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-attributes/?populate=atribute&sort=order`
    //,{ next: { revalidate: 300 } }
  );
  return res.json();
}

export default async function Home() {
  const { data: dSlider } = await getDataSlider();
  const { data: dCategories } = await getListCategories();
  //const { data: dAttributes } = await getListAttributes();

  const [dataSlider, dataCategories] = await Promise.all([
    dSlider,
    dCategories,
    // dAttributes,
  ]);

  async function getProductListCard(slug) {
    const { data } = await getListProducts(slug);

    return <ProductList shortPost promise={data} />;
  }

  async function getAttrList(pos) {
    const { data } = await getListAttributes();
    if (data && data[pos]) {
      return <AttributesCard data={data[pos]} />;
    } else {
      return null;
    }
  }

  return (
    <main>
      {/* <SsrCarousel promise={dataSlider} /> */}

      <Suspense fallback={<p>Cargando slider...</p>}>
        <Slider promise={dataSlider} />
      </Suspense>

      <div className="container px-4 pt-9">
        <div className="grid lg:grid-cols-12 lg:gap-12">
          <main className="col-span-12">
            <section className="mb-8">
              <Suspense fallback={<p>Cargando atributos...</p>}>
                {getAttrList(0)}
              </Suspense>
            </section>

            {dataCategories.map((categoria) => {
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
