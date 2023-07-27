import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import markdownToHtml from "@/app/utils/markdownToHtml";

async function fetchNosotros() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/companies?populate=contentblock.cover`,
    { next: { revalidate: 30 } }
  );
  return res.json();
}

export default async function NosotrosPage() {
  const { data } = await fetchNosotros();

  const secciones = await Promise.all(
    data.map((content, i) => {
      let bgcolor = content.attributes.background;
      return (
        <section
          key={"section-block" + i}
          className="pb-8 mb-8 rounded-md"
          style={{
            backgroundColor: bgcolor ? "#f0ece7" : "",
            backgroundImage: bgcolor
              ? `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23faf8f7' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
              : null,
            padding: bgcolor ? "30px" : "",
          }}
        >
          <div>
            <h2 className=" text-4xl font-semibold text-slate-900 text-center block mb-10">
              {content.attributes.title}
            </h2>
          </div>

          {content.attributes.contentblock.map(async (item, i) => {
            const richtext = await markdownToHtml(item.content);
            return await (
              <div
                className="grid grid-cols-1 lg:grid-cols-5 gap-10"
                key={"block" + i}
              >
                <div className="col-span-2">
                  {item.cover?.data && (
                    <Image
                      src={
                        item.cover?.data.attributes.formats?.medium
                          ? item.cover?.data.attributes.formats.medium.url
                          : item.cover?.data.attributes.url
                      }
                      width={item.cover?.data.attributes.width}
                      height={item.cover?.data.attributes.height}
                      alt={item.title}
                      className="rounded"
                    ></Image>
                  )}
                </div>
                <div className="col-span-3">
                  <h2 className="font-semibold text-slate-900 mb-2 text-2xl">
                    {item.title}
                  </h2>
                  <h4 className="font-semibold text-slate-900 mb-3 text-md">
                    {item.subtitle}
                  </h4>
                  <div
                    className=" mb-7"
                    dangerouslySetInnerHTML={{ __html: richtext }}
                  ></div>
                  <Link className="btn" href={`/${item.url}`}>
                    {item.titlebutton}
                  </Link>
                </div>
              </div>
            );
          })}
        </section>
      );
    })
  );

  return (
    <div className="container px-4 pt-9">
      <main className="mb-8">
        <Suspense fallback={<p>Cargando atributos...</p>}>{secciones}</Suspense>
      </main>
    </div>
  );
}
