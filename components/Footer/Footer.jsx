import { Suspense } from "react";

import Link from "next/link";
import Image from "next/image";

import SocialLinks from "@/components/SocialLinks/SocialLinks";



async function fetchData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/main-menus/?populate=*`,
        { next: { revalidate: 30 } })
    return res.json()
}


export default async function Footer() {

    const data = await fetchData()

    const datamenu = data?.data[0].attributes.Enlace;

    const datadescripcion = data?.data[0].attributes.descripcion;

    const logo = data?.data[0].attributes.imagenlogo?.data?.attributes.url;




    return (
        <footer className="bg-gray-100" style={{
            backgroundColor: '#2c1e0d',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%23694525' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E")`
        }}>
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-center text-teal-600">
                    {
                        logo &&
                        <Image
                            src={logo}
                            width={248}
                            height={56}
                            alt="Logo"
                        />


                    }
                </div>

                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400">

                    {
                        datadescripcion && datadescripcion
                    }
                </p>

                {datamenu && (
                    <nav
                        className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12"
                    >
                        {datamenu?.map((itemMenu) => {
                            return (
                                <Link
                                    href={itemMenu.enlace}
                                    key={`menu-${itemMenu.id}`}
                                    className="text-gray-300 transition hover:text-gray-300/75"
                                >
                                    {itemMenu.titulo}
                                </Link>
                            );
                        })}
                    </nav>
                )}



                <ul className="mt-12 flex justify-center gap-6 md:gap-8">

                    <Suspense fallback={<p>Cargando atributos...</p>} className="text-white">
                        <SocialLinks />
                    </Suspense>

                </ul>
            </div>
        </footer>
    )
}



