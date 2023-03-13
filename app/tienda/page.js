import ProductList from "./productList";

export default function TiendaPage(props) {
    return (
        <div className="container px-4 pt-9">
            <div className="grid lg:grid-cols-12 lg:gap-12">
                <main className="col-span-12 lg:col-span-8 mb-8">
                    <section className="grid  grid-cols-2 lg:grid-cols-4 gap-6">
                        <ProductList shortPost />
                    </section>
                </main>
                <aside className="bg-slate-500 min-h-screen block col-span-12 lg:col-span-4">
                    aside
                </aside>

            </div>
           
        </div>
    );
}

