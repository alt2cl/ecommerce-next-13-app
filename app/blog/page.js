
import PostsList from "./postsList.jsx";

export default async function BlogPage({ params }) {

    return (
        
        <div className="container px-4 pt-9">
            <div className="grid lg:grid-cols-12 lg:gap-12">
                <main className="col-span-12 lg:col-span-8 mb-8">
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <PostsList shortPost/>
                    </section>
                </main>
                <aside className=" block col-span-12 lg:col-span-4">
                    aside
                </aside>

            </div>
           
        </div>
            
            

    );
}
