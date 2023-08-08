//"use client";

import { Suspense } from "react";
import Slider from "@/components/Slider/Slider";
import ProductList from "@/components/ProductList/productList";
import HeadSection from "@/components/HeadSection/HeadSection";
import AttributesCard from "@/components/AtributtesCard/AttributesCard";
//import useFetch from "./api/strapi/useFetch";

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
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-categories/?populate=?sort=order`,
    { next: { revalidate: 60 } }
  );
  return res.json();
}

async function getListProducts(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?populate=*&filters[featured_categories][slug][$contains]=${slug}`,
    { next: { revalidate: 30 } }
  );
  return res.json();
}

async function getListAttributes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-attributes/?populate=atribute&sort=order`,
    { next: { revalidate: 30 } }
  );
  return res.json();
}

export default async function Home() {
  const { data: dSlider } = await getDataSlider();
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
                {getAttrList(0)}
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

            {getAttrList(1) ? (
              <section>
                <Suspense fallback={<p>Cargando atributos...</p>}>
                  {getAttrList(1)}
                </Suspense>
              </section>
            ) : null}

            {getAttrList(2) ? (
              <section>
                <Suspense fallback={<p>Cargando atributos...</p>}>
                  {getAttrList(2)}
                </Suspense>
              </section>
            ) : null}

            {getAttrList(3) ? (
              <section>
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