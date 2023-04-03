import Image from "next/image"
import Link from "next/link"

async function fetchPosts (){
    let res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/productos?populate=imagen`)
    return res.json();
}

export default async function ProductList({shortPost}) {
    const {data} = await fetchPosts()
    console.log('la dataxxx:', data)
    return (
            <>
                {
                    data.map(post=>{
                        const item = post.attributes
                        const {nombre, descripcion, publishedAt, url, imagen, precio} = item
                        console.log('imagen_',imagen)
                        return(
                        <div key={post.id} className={'flex flex-col gap-3 mb-5 lg:mb-16'} >
                            <div className="flex justify-center">
                                

                                
                                
                                <Image 
                                src={imagen.data[0].attributes.formats.medium ? imagen.data[0].attributes.formats.medium.url : imagen.data[0].attributes.url} 
                                alt={`imagen de ${nombre}`} 
                                width={400} 
                                height={400}
                                className={'rounded-xl'}
                                ></Image>
                            </div>
                            <div className='flex flex-col col-span-4'>
                                <h3 className="text-md mb-3 font-semibold text-slate-900">{nombre}</h3>
                                <p className={`${shortPost ? 'lineclamp-4 mb-5': 'mb-5'} text-slate-500 text-sm `}>{descripcion}</p>
                                <p className="text-md text-slate-800 font-medium mb-6">${precio}</p>
                                
                                <Link href={`/tienda/${url}`} className="rounded-md text-center p-2 bg-orange-500 hover:bg-slate-900 text-white">
                                    Ir al producto...
                                </Link>
                            </div>
                        </div>

                    )})
                }
            </>
        
           
            
            

    );
}
