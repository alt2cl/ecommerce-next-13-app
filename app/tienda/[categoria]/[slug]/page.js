import AdStoreBtn from "./adStoreBtn";
import AdWhatsAppBtn from "./adWhatsAppBtn";
import markdownToHtml from "@/src/utils/markdownToHtml";
import ThumbList from "@/src/components/ThumbList/ThumbList";

import Carousel from "@/src/components/Carousel";
import { fetchStrapiData } from "@/src/lib/api";

export async function generateMetadata({ params: { slug } }) {
  const id = slug;

  console.log("slug", slug);

  return false;

  //const product = await getPost(id);
  const { data: product } = await fetchStrapiData(
    `products?filters[slug]=${id}&populate=*`
  );

  const {
    cover: imagen,
    title: titulo,
    description: descripcion,
    price: precio,
    gallery: galeria,
  } = product.data[0].attributes;

  const cutImagen = imagen?.data.attributes.url.replace(
    "upload/",
    "upload/c_fill,h_800,w_600/"
  );

  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      images: [
        {
          url: cutImagen,
          width: 800,
          height: 600,
          alt: titulo,
        },
      ],
    },
  };
}

export default async function ProductoPage({ params: { slug } }) {
  const id = slug;

  //const categoria = slug.slice(0, 1)[0];

  //const product = await getPost(id);

  const { data: product } = await fetchStrapiData(
    `products?filters[slug]=${id}&populate=*`
  );

  const { data: datasidebar } = await fetchStrapiData(
    `products?populate=category_products&populate=cover&filters[category_products][slug][$contains]=cafe`
  );

  const {
    cover: imagen,
    title: titulo,
    description: descripcion,
    price: precio,
    gallery: galeria,
  } = product.data[0].attributes;

  const richtext = await markdownToHtml(descripcion);

  return (
    <>
      <div className="container px-4 pt-6">
        <div className="grid lg:grid-cols-12 lg:gap-12">
          <main className="col-span-12 lg:col-span-8 mb-8">
            <section className="section">
              <div className="grid grid-cols-7 gap-6">
                <div className="flex justify-center col-span-7 lg:col-span-3">
                  {galeria?.data && (
                    <Carousel
                      arrayImage={galeria.data}
                      width={400}
                      height={400}
                      passId={`carousel${id}`}
                    />
                  )}
                </div>
                <div className="flex flex-col col-span-7 lg:col-span-4">
                  <h3 className="text-md lg:text-3xl mb-3 font-semibold text-slate-900">
                    {titulo}
                  </h3>
                  {/* <p className={` text-slate-500 text-sm mb-4`}>{descripcion}</p> */}
                  <div
                    className="prose prose-slate mb-4"
                    dangerouslySetInnerHTML={{ __html: richtext }}
                  ></div>
                  <p className="text-md text-slate-800 font-medium ">
                    ${precio}
                  </p>

                  <AdWhatsAppBtn
                    product={product}
                    imagen={imagen}
                    nombre={titulo}
                    descripcion={descripcion}
                    precio={precio}
                  />

                  {/* <AdStoreBtn
                    product={product}
                    imagen={imagen}
                    nombre={titulo}
                    descripcion={descripcion}
                    precio={precio}
                  /> */}
                </div>
              </div>
            </section>
          </main>
          <aside className="  block col-span-12 lg:col-span-4">
            {datasidebar && (
              <ThumbList
                headtext={"Titulo"}
                promise={datasidebar?.data}
                hidedescription
                itemtoshow={3}
              />
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
