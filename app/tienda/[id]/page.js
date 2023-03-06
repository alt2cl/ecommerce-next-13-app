import Image from "next/image";
import AdStoreBtn from "./adStoreBtn";

const fetchPost = (id) => {
    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/guitarras?filters[url]=${id}&populate=imagen`)
    .then(res => res.json())
}


export default async function ProductoPage({params: {id}}) {

    const product = await fetchPost(id)

    const {imagen, nombre, descripcion, precio} = product.data[0].attributes

    return (
        <div className="container px-4">
            <div className="grid grid-cols-12 gap-10">
                <main className="col-span-12 md:col-span-9">
                    <section className="grid  grid-cols-1 gap-7">
                        <div className='grid grid-cols-7 gap-6'>
                            <div className="flex justify-center col-span-3">
                            <Image src={imagen.data.attributes.url} alt={`Imagen ${nombre}`} width={200} height={450} />
                            </div>
                            <div className='flex flex-col col-span-4'>
                                <h3 className='mb-5 font-semibold'>{nombre}</h3>
                                <p className='mb-5'>{descripcion}</p>
                                <span>${precio}</span>
                                
                                <AdStoreBtn product={product} imagen={imagen} nombre={nombre} descripcion={descripcion} precio={precio}/>
                                
                            </div>
                        </div>
                        
                    </section>
                </main>
                <aside className="col-span-12 md:col-span-3">
                    aside
                </aside>

            </div>
           
        </div>
    );
}



