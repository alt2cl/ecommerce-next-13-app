import Image from "next/image"
import Link from "next/link"

const fetchPosts = () => {
    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/guitarras?populate=imagen`)
    .then(res => res.json())
}

export default async function ProductList({shortPost}) {
    

    const posts = await fetchPosts()

    console.log('product:', posts.data[0].attributes)

    return (
        
            <>
                {
                    posts.data.map(post=>{
                        const item = post.attributes
                        const {nombre, descripcion, publishedAt, url, imagen, precio} = item
                        return(
                        <div key={post.id} className={'grid grid-cols-7 gap-6'} >
                            <div className="flex justify-center col-span-3">
                                <Image src={imagen.data.attributes.formats.medium.url} alt={`imagen de ${nombre}`} width={111} height={250}></Image>
                                
                            </div>
                            <div className='flex flex-col col-span-4'>
                                <h3 className="mb-5 font-semibold">{nombre}</h3>
                                <p className={shortPost ? 'lineclamp-4 mb-5': 'mb-5'}>{descripcion}</p>
                                <p>${precio}</p>
                                
                                <Link href={`/tienda/${url}`}>Ir al producto...</Link>
                            </div>
                        </div>

                    )})
                }
            </>
        
           
            
            

    );
}
