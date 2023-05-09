
import AdStoreBtn from "./adStoreBtn";
import markdownToHtml from "@/app/utils/markdownToHtml";
import Carousel from "@/components/Carousel";

const getPost = (id)=> {
    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/productos?filters[url]=${id}&populate=imagen`, { cache: 'no-store' })
    .then(res=> res.json())
    
}


export default async function ProductoPage({params: { slug }}) {

    const id = slug.slice(-1)

    const product = await getPost(id)
    //const product = await productData;

    console.log('product data:', product.data[0].attributes)

    const {imagen, titulo, descripcion, precio} = product.data[0].attributes

    const richtext = await markdownToHtml(descripcion)

    return (
        <div className="container px-4 pt-6">
            <div className="grid lg:grid-cols-12 lg:gap-12">
                <main className="col-span-12 lg:col-span-8 mb-8">
                    <section className="section">
                        <div className='grid grid-cols-7 gap-6'>
                            <div className="flex justify-center col-span-7 lg:col-span-3">

                                <Carousel arrayImage={imagen.data} passId={`carousel${id}`} />
                                
                            </div>
                            <div className='flex flex-col col-span-7 lg:col-span-4'>
                                <h3 className="text-md lg:text-3xl mb-3 font-semibold text-slate-900">{titulo}</h3>
                                {/* <p className={` text-slate-500 text-sm mb-4`}>{descripcion}</p> */}
                                <div className="prose prose-slate mb-4" dangerouslySetInnerHTML={{__html: richtext}}></div>
                                <p className="text-md text-slate-800 font-medium ">${precio}</p>
                                
                                <AdStoreBtn product={product} imagen={imagen} nombre={titulo} descripcion={descripcion} precio={precio}/>
                                
                            </div>
                        </div>
                        
                    </section>
                </main>
                <aside className="  block col-span-12 lg:col-span-4">
                    aside
                </aside>

            </div>
           
        </div>
    );
}



