import HeadSection from "@/components/HeadSection/HeadSection";
import Link from "next/link";

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
              className="flex flex-col gap-3 mb-5 lg:mb-16 drop-shadow-md px-4 py-4 rounded-lg bg-white items-center"
              key={`att-${item.id}`}
            >
              <h3 className="uppercase text-xl">{item.title}</h3>
              <h5 className="text-lg">{item.subtitle}</h5>
              <p className="text-gray-600">{item.description}</p>
              {item.url && item.titlebutton && (
                <Link
                  href={item.url}
                  className="rounded-md text-center p-2 bg-orange-500 hover:bg-slate-900 text-white"
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
