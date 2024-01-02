import HeadSection from "@/src/components/HeadSection/HeadSection";
import Link from "next/link";
import Image from "next/image";

function AttributesCard({ data }) {
  const cantCol = "lg:grid-" + String(data?.attributes.cols);

  return (
    <>
      <HeadSection
        titulo={data.attributes.title}
        subtitulo={data.attributes.subtitle}
        center
      />
      <div
        className={`grid grid-cols-1 gap-6 ${
          data.attributes.cols ? cantCol : "lg:grid-cols-3"
        }`}
      >
        {data.attributes?.atribute?.map((item) => {
          return (
            <div
              className={` flex flex-col gap-3 mb-5 lg:mb-16 drop-shadow-md px-4 py-4 rounded-lg bg-white items-center text-center ${
                item.cover.data?.attributes ? "mt-20" : null
              }`}
              key={`att-${item.id}`}
            >
              {item.cover && item.cover.data && item.cover.data.attributes && (
                <Image
                  className="-mt-20 max-w-[50%]"
                  src={item.cover.data.attributes.url.replace(
                    "upload/",
                    "upload/c_fill,h_400,w_400/"
                  )}
                  width={400}
                  height={400}
                  loading="lazy"
                  alt={item.title}
                />
              )}

              <h3 className="uppercase font-semibold text-xl text-center">
                {item.title}
              </h3>
              <h5 className="text-lg text-center">{item.subtitle}</h5>
              <p className="text-gray-600 text-center mb-3">
                {item.description}
              </p>
              {item.url && item.titlebutton && (
                <Link
                  href={item.url}
                  alt={item.title}
                  className="rounded-md text-center px-4 py-2 font-medium bg-primary-500 hover:bg-slate-900 text-white"
                >
                  {item.titlebutton}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AttributesCard;
