import PostsList from "../postsList";
import Image from "next/image";
import Link from "next/link";

async function fetchPost(id){
    const res = fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?filters[url]=${id}&populate=imagen`)

    if (!res.ok) {
        throw new error('Failed falla to fetch data blog id')
        
    }
    return res.json();
}


export default async function PostPage({params:{id}}) {

    const post = await fetchPost(id)
    const {titulo, contenido, imagen, publishedAt} = post.data[0].attributes
   
    return (
        <div className="container px-4 pt-9">
            <div className="grid lg:grid-cols-12 lg:gap-12">
                <main className="col-span-12 lg:col-span-8 mb-8">
                    
                    <article>
                        <h2 className="title text-4xl text-slate-900 font-semibold mb-5">{titulo}</h2>
                        <p className="text-xs text-slate-400 mb-4">{publishedAt}</p>
                       
                        <Image 
                        src={imagen.data.attributes.url} 
                        alt={`Imagen ${titulo}`} 
                        width={800} 
                        height={450} 
                        className="mb-3 rounded" />

                        <p className="text-slate-700 text-md">
                        {contenido}
                        </p>
                       
                       
                       
                    </article>
                </main>
                <aside className="bg-slate-500 min-h-screen block col-span-12 lg:col-span-4">
                <PostsList shortPost={true} />
                </aside>

            </div>
           
        </div>
    );
}
