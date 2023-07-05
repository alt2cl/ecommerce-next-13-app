//"use client";

import { Suspense } from "react";
import Slider from "@/components/Slider/Slider";
import ProductList from "../components/ProductList/productList";
import HeadSection from "@/components/HeadSection/HeadSection";
import AttributesCard from "@/components/AtributtesCard/AttributesCard";
//import useFetch from "./api/strapi/useFetch";

async function getDataSlider() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/destacados-portadas?populate=imagen`
  );
  return res.json();
}

async function getListCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/categorias-destacadas`
  );
  return res.json();
}

async function getListProducts(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/productos?populate=*&filters[categorias_destacadas][slug][$contains]=${slug}`
  );
  return res.json();
}

async function getListAttributes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/atributos-destacados?populate=*`
  );
  return res.json();
}

export default async function Home() {
  const { data: dSlider } = await getDataSlider();
  const { data: dCategories } = await getListCategories();
  const { data: dAttributes } = await getListAttributes();

  //const [datakey, setDatakey] = useState([]);

  const [dataSlider, dataCategories, dataAttributes] = await Promise.all([
    dSlider,
    dCategories,
    dAttributes,
  ]);

  async function getProductListCard(slug) {
    const { data } = await getListProducts(slug);

    return <ProductList shortPost promise={data} />;
  }

  return (
    <main>
      <Suspense fallback={<p>Cargando slider...</p>}>
        <Slider data={dataSlider} promise={dataSlider} />
      </Suspense>

      <div className="container px-4 pt-9">
        <div className="grid lg:grid-cols-12 lg:gap-12">
          <main className="col-span-12">
            <section>
              {/* <div className="grid  grid-cols-2 lg:grid-cols-4 gap-6"> */}
              <Suspense fallback={<p>Cargando atributos...</p>}>
                <AttributesCard data={dataAttributes[0]} />
              </Suspense>
              {/* </div> */}
            </section>

            {dataCategories.map((categoria) => {
              return (
                <section key={`section-${categoria.id}`}>
                  <HeadSection
                    titulo={categoria.attributes.titulo}
                    subtitulo={categoria.attributes.subtitulo}
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
                <AttributesCard data={dataAttributes[1]} />
              </Suspense>
            </section>
          </main>
        </div>
      </div>
    </main>
  );
}
