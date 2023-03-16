import Image from "next/image";
import AdStoreBtn from "./adStoreBtn";

async function fetchPost (id){
    const res =  fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/guitarras?filters[url]=${id}&populate=imagen`)
    if (!res.ok) {
        throw new error('Failed falla to fetch data tienda page')
        
    }
    return res.json();
}


export default async function ProductoPage({params: {id}}) {

    const product = await fetchPost(id)

    const {imagen, nombre, descripcion, precio} = product.data[0].attributes

    return (
        <div className="container px-4 pt-6">
            <div className="grid lg:grid-cols-12 lg:gap-12">
                <main className="col-span-12 lg:col-span-8 mb-8">
                    <section className="section">
                        <div className='grid grid-cols-7 gap-6'>
                            <div className="flex justify-center col-span-7 lg:col-span-3">
                            <Image src={imagen.data.attributes.url} alt={`Imagen ${nombre}`} width={500} height={500}  className={'rounded-xl'} />
                            </div>
                            <div className='flex flex-col col-span-7 lg:col-span-4'>
                                <h3 className="text-md lg:text-3xl mb-3 font-semibold text-slate-900">{nombre}</h3>
                                <p className={` text-slate-500 text-sm mb-4`}>{descripcion}</p>
                                <p className="text-md text-slate-800 font-medium ">${precio}</p>
                                
                                <AdStoreBtn product={product} imagen={imagen} nombre={nombre} descripcion={descripcion} precio={precio}/>
                                
                            </div>
                        </div>
                        
                    </section>
                </main>
                <aside className=" bg-slate-500 min-h-screen block col-span-12 lg:col-span-4">
                    aside
                </aside>

            </div>
           
        </div>
    );
}



