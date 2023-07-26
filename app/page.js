//"use client";

import { Suspense } from "react";
import Slider from "@/components/Slider/Slider";
import ProductList from "../components/ProductList/productList";
import HeadSection from "@/components/HeadSection/HeadSection";
import AttributesCard from "@/components/AtributtesCard/AttributesCard";
import useFetch from "./api/strapi/useFetch";

async function getDataSlider() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/sliders?populate=cover`,
      { next: { revalidate: 60 } }
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
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-categories/?sort=order`,
    { next: { revalidate: 60 } }
  );
  return res.json();
}

async function getListProducts(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?populate=*&filters[featured-categories][slug][$contains]=${slug}`,
    { next: { revalidate: 30 } }
  );
  return res.json();
}

async function getListAttributes(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-attributes/${id}/?populate=*`,
    { next: { revalidate: 30 } }
  );
  return res.json();
}

export default async function Home() {
  const { data: dSlider } = await getDataSlider();
  console.log("data slider parent:", dSlider);
  const { data: dCategories } = await getListCategories();
  //const { data: dAttributes } = await getListAttributes();

  //const [datakey, setDatakey] = useState([]);

  const [dataSlider, dataCategories] = await Promise.all([
    dSlider,
    dCategories,
    // dAttributes,
  ]);

  async function getProductListCard(slug) {
    const { data } = await getListProducts(slug);

    return <ProductList shortPost promise={data} />;
  }

  async function getAttrList(id) {
    const { data } = await getListAttributes(id);
    if (data) {
      return <AttributesCard data={data} />;
    } else {
      return null;
    }
  }

  return (
    <main>
      <Suspense fallback={<p>Cargando slider...</p>}>
        <Slider promise={dataSlider} />
      </Suspense>

      <div className="container px-4 pt-9">
        <div className="grid lg:grid-cols-12 lg:gap-12">
          <main className="col-span-12">
            <section>
              {/* <div className="grid  grid-cols-2 lg:grid-cols-4 gap-6"> */}
              <Suspense fallback={<p>Cargando atributos...</p>}>
                {/* <AttributesCard data={dataAttributes[0]} /> */}
                {getAttrList(1)}
              </Suspense>
              {/* </div> */}
            </section>

            {dataCategories.map((categoria) => {
              return (
                <section key={`section-${categoria.id}`}>
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

            <section>
              <Suspense fallback={<p>Cargando atributos...</p>}>
                {getAttrList(2) ? getAttrList(2) : null}
              </Suspense>
            </section>
          </main>
        </div>
      </div>
    </main>
  );
}
