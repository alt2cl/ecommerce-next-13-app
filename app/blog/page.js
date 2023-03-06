
import PostsList from "./postsList";

export default function BlogPage(props) {

    return (
        
        <div className="container px-4">
            <div className="grid grid-cols-12 gap-6">
                <main className="col-span-12 md:col-span-9">
                    <section>
                        <PostsList />
                    </section>
                </main>
                <aside className="col-span-12 md:col-span-3">
                    aside
                </aside>

            </div>
           
        </div>
            
            

    );
}
