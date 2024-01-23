import Image from "next/image";
import Link from "next/link";

export default async function BannerBlock() {
  return (
    <>
      <div className="mx-auto rounded-lg overflow-hidden">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#cbab05" />
                <stop offset={1} stopColor="#cbab05" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Café Boutique en Miniatura:
              <br />
              El Toque Perfecto para Tus Regalos Corporativos.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Sorprende y Delicia con Frascos Personalizados de Café Premium –
              Ideal para Clientes y Empleados
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Solicita este servicio
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Saber más <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="https://cafemas.cl/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdn5bsevc9%2Fimage%2Fupload%2Fc_fill%2Ch_500%2Cw_600%2Fv1701737320%2F1_5f3723bc17.jpg&w=1200&q=75"
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </>
  );
}
