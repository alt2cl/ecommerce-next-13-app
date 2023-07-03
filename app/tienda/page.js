import { Suspense } from "react";
import ProductList from "../../components/ProductList/productList";

// `${process.env.NEXT_PUBLIC_STRAPI_URL}/productos?populate=imagen&populate[0]=categoria_categoria_productos`

async function fetchPosts() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/productos?populate=*`
  );
  return res.json();
}

export default async function TiendaPage(props) {
  const { data } = await fetchPosts();

  return (
    <div className="container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12 lg:col-span-8 mb-8">
          <section>
            <div className="grid  grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={<p>Cargando productos...</p>}>
                <ProductList shortPost promise={data} />
              </Suspense>
            </div>
          </section>
        </main>
        <aside className="block col-span-12 lg:col-span-4">aside</aside>
      </div>
    </div>
  );
}
