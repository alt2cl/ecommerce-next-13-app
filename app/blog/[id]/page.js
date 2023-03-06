import PostsList from "../postsList";
import Image from "next/image";

const fetchPost = (id) => {
    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?filters[url]=${id}&populate=imagen`)
    .then(res => res.json())
}


export default async function PostPage({params:{id}}) {

    const post = await fetchPost(id)
    const {titulo, contenido, imagen, publishedAt} = post.data[0].attributes


   
    return (
        <div className="container px-4">
            <div className="grid grid-cols-12 gap-6">
                <main className="col-span-12 md:col-span-9">
                    
                    <article>
                        <h2>{titulo}</h2>
                        <span>{publishedAt}</span>
                        <Image src={imagen.data.attributes.url} alt={`Imagen ${titulo}`} width={600} height={450} />
                        
                 
                        {contenido}
                    </article>
                </main>
                <aside className="col-span-12 md:col-span-3">
                <PostsList shortPost={true} />
                </aside>

            </div>
           
        </div>
    );
}
