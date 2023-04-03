import Image from "next/image";
import Link from "next/link";
import markdownToHtml from "@/app/utils/markdownToHtml";


async function fetchNosotros() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/empresas?populate=imagen`, { cache: 'no-store' })
    return res.json()
}

export default async function NosotrosPage(props) {

    const {data} = await fetchNosotros()

    const secciones = await Promise.all(
        data.map(async (content)=>{
            const richtext = await markdownToHtml(content.attributes.contenido)
            
            return await (
                <section className="pb-8">
                    <div>
                        <h2 className=" text-4xl font-semibold text-slate-900 text-center block mb-10">
                            {content.attributes.tituloseccion}
                        </h2>
                    </div>
                    <div className='grid grid-cols-5 gap-10'>
                            <div className="col-span-2">
                                <Image 
                                src={content.attributes.imagen.data.attributes.formats?.medium ? 
                                    content.attributes.imagen.data.attributes.formats.medium.url
                                    :
                                    content.attributes.imagen.data.attributes.url
                                } 
                                width={1000} 
                                height={800} 
                                alt={content.attributes.titulo}
                                className="rounded"
                                ></Image>
                            </div>
                            <div className="col-span-3">
                                <h2 className="font-semibold text-slate-900 mb-2 text-2xl">{content.attributes.titulo}</h2>
                                <h4 className="font-semibold text-slate-900 mb-3 text-md">{content.attributes.subtitulo}</h4>
                                <div className="prose prose-slate" dangerouslySetInnerHTML={{__html: richtext}}></div>
                                <Link className="btn" href={`/${content.attributes.url}`}>
                                    {content.attributes.urlname}
                                </Link>
                            </div>
                    </div>
                </section>
            )
        })

    )
   
    


    return (
        <div className="container px-4 pt-9">
            <main className="mb-8">
                {

                
                secciones
                }
            </main>
        </div>
    );
}

