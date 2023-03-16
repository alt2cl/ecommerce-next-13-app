import Image from "next/image"
import Link from "next/link"

async function fetchPosts() {
    const res = fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?populate=imagen`)

    if (!res.ok) {
        throw new error('Failed falla to fetch data postList')
        
    }

    return res.json();
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
                        <article key={post.id} className='mb-10' >
                            <div>
                                <Link href={`/blog/${url}`}>
                                <h3 className="title text-3xl text-slate-900 font-semibold mb-5">{titulo}</h3>
                                </Link>
                                <p className="text-xs text-slate-400 mb-3">{publishedAt}</p>
                                <Link href={`/blog/${url}`} className="rounded">
                                    <Image src={imagen.data.attributes.formats.medium.url} 
                                    alt={`imagen de articulo ${titulo}`} 
                                    width={800} 
                                    height={400}
                                    className="mb-3 rounded"
                                    ></Image>
                                </Link>
                            </div>
                            <div>
                                <p className={`${shortPost ? 'lineclamp-4': ''} text-slate-500 text-sm`}>{contenido}</p>
                            </div>
                        </article>

                    )})
                }
            </>
        
           
            
            

    );
}
