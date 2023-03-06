import ProductList from "./productList";

export default function TiendaPage(props) {
    return (
        <div className="container px-4">
            <div className="grid grid-cols-12 gap-10">
                <main className="col-span-12 md:col-span-9">
                    <section className="grid  grid-cols-1 lg:grid-cols-3 gap-7">
                        <ProductList shortPost />
                    </section>
                </main>
                <aside className="col-span-12 md:col-span-3">
                    aside
                </aside>

            </div>
           
        </div>
    );
}

