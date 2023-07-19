import HeadSection from "@/components/HeadSection/HeadSection";
import Link from "next/link";

function AttributesCard({ data }) {
  const cantCol = "lg:grid-" + String(data?.attributes.cols);

  return (
    <>
      <HeadSection
        titulo={data.attributes.titulo}
        subtitulo={data.attributes.subtitulo}
        center
      />
      <div
        className={`grid grid-cols-1 gap-6 ${
          data.attributes.cols ? cantCol : "lg:grid-cols-3"
        }`}
      >
        {data.attributes?.Atributos?.map((item) => {
          return (
            <div
              className="flex flex-col gap-3 mb-5 lg:mb-16 drop-shadow-md px-4 py-4 rounded-lg bg-white items-center"
              key={`att-${item.id}`}
            >
              <h3 className="uppercase text-xl">{item.titulo}</h3>
              <h5 className="text-lg">{item.subtitulo}</h5>
              <p className="text-gray-600">{item.descripcion}</p>
              {item.link && item.titulolink && (
                <Link
                  href={item.link}
                  className="rounded-md text-center p-2 bg-orange-500 hover:bg-slate-900 text-white"
                >
                  {item.titulolink}
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
