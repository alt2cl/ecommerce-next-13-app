import ProductList from "@/components/ProductList/productList";
import PostsList from "../../components/PostList/postsList";
import ThumbList from "@/components/ThumbList/ThumbList";

async function getData() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/posts?populate=cover`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getDataSidebar() {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/featured-sidebars/?populate=products.category_products&populate=products.cover`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function BlogPage() {
  const { data } = await getData();

  const { data: datasidebar } = await getDataSidebar();
  //console.log("datasidebar_", datasidebar[0].attributes.products);

  return (
    <div className="container px-4 pt-9">
      <div className="grid lg:grid-cols-12 lg:gap-12">
        <main className="col-span-12 lg:col-span-8 mb-8">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PostsList shortPost data={data} promise={data} />
          </section>
        </main>
        <aside className=" block col-span-12 lg:col-span-4">
          <div>
            <article class="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg mb-10">
              <img
                alt="Office"
                src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                class="absolute inset-0 h-full w-full object-cover"
              />

              <div class="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
                <div class="p-4 sm:p-6">
                  <time
                    datetime="2022-10-10"
                    class="block text-xs text-white/90"
                  >
                    10th Oct 2022
                  </time>

                  <a href="#">
                    <h3 class="mt-0.5 text-lg text-white">
                      How to position your furniture for positivity
                    </h3>
                  </a>

                  <p class="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae dolores, possimus pariatur animi temporibus
                    nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos.
                    Molestias explicabo corporis voluptatem?
                  </p>
                </div>
              </div>
            </article>
          </div>

          {datasidebar?.map((item) => {
            return (
              <ThumbList
                headtext={item.attributes.title}
                promise={item.attributes.products.data}
              />
            );
          })}
        </aside>
      </div>
    </div>
  );
}
