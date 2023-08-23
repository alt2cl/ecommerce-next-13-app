import HeadSection from "@/components/HeadSection/HeadSection";
import Link from "next/link";

function AttributesCard({ data }) {
  const cantCol = "lg:grid-" + String(data?.attributes.cols);

  console.log("date dentro>>", data.attributes.cols);

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
              className={`flex flex-col gap-3 mb-5 lg:mb-16 drop-shadow-md px-4 py-4 rounded-lg bg-white items-center text-center ${
                item.cover.data?.attributes ? "mt-20" : null
              }`}
              key={`att-${item.id}`}
            >
              {item.cover && item.cover.data && item.cover.data.attributes && (
                <img
                  className="-mt-20 max-w-[50%]"
                  src={item.cover.data.attributes.url}
                  alt={item.title}
                />
              )}

              <h3 className="uppercase text-xl text-center">{item.title}</h3>
              <h5 className="text-lg text-center">{item.subtitle}</h5>
              <p className="text-gray-600 text-center">{item.description}</p>
              {item.url && item.titlebutton && (
                <Link
                  href={item.url}
                  className="rounded-md text-center p-2 bg-primary-500 hover:bg-slate-900 text-white"
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
