import Image from "next/image"
import Link from "next/link"

const fetchPosts = () => {
    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?populate=imagen`)
    .then(res => res.json())
}

export default async function PostsList({shortPost}) {
    

    const posts = await fetchPosts()
    //const {titulo, imagen , contenido, url, publishedAt} = posts.attributes
    console.log('los imagen:', posts.data[0].attributes.imagen)

    return (
        
            <>
                {
                    posts.data.map(post=>{
                        const item = post.attributes
                        const {titulo, publishedAt, url, imagen, contenido} = item
                        return(
                        <article key={post.id} >
                            <div>
                                <h3 className="title">{titulo}</h3>
                                <p>{publishedAt}</p>
                                <Image src={imagen.data.attributes.formats.medium.url} alt={`imagen de articulo ${titulo}`} width={800} height={400}></Image>
                            </div>
                            <div>
                                <p className={shortPost ? 'lineclamp-4': ''}>{contenido}</p>
                                <Link href={`/blog/${url}`}>Leer post...</Link>
                            </div>
                        </article>

                    )})
                }
            </>
        
           
            
            

    );
}
