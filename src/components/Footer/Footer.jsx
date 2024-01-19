import { Suspense } from "react";

import Link from "next/link";
import Image from "next/image";
import HeadSection from "@/src/components/HeadSection/HeadSection";
import { fetchStrapiData } from "@/src/lib/api";
import SocialLinks from "@/src/components/SocialLinks/SocialLinks";




export default async function Footer() {


    const { data } = await fetchStrapiData(
        `menus/?populate=*&sort=rank:asc`
    );




    return (
        <footer className="bg-gray-900" >
            <div className="container px-4 pt-12 pb-10">
                <div className="flex-column lg:flex">

                    {data?.data.map((item) => {

                        if (item.attributes.title != "top") {
                            return (
                                <div className="w-full lg:w-1/4 px-5 pb-10">
                                    {item.attributes.logo.data?.attributes.url ? <Image
                                        className=" max-w-sm mb-6"
                                        src={item.attributes.logo.data?.attributes.url.replace(
                                            "upload/",
                                            "upload/c_fill,h_112,w_496/"
                                        )}
                                        width={248}
                                        height={56}
                                        loading="lazy"
                                        alt="Logo"
                                    /> : <HeadSection
                                        titulo={item.attributes.title}
                                        fontStyle={"uppercase text-white "}
                                    />}

                                    {item.attributes.description && <p className=" mt-4  leading-relaxed text-gray-300">
                                        {
                                            item.attributes.description
                                        }
                                    </p>}

                                    {item.attributes.sociallinks &&
                                        <ul className="mt-6 flex gap-6 md:gap-8 mb-7">
                                            {item.attributes.sociallinks &&
                                                <Suspense fallback={<p>Cargando social links...</p>} className="text-white">
                                                    <SocialLinks data={item.attributes.sociallinks} />
                                                </Suspense>
                                            }
                                        </ul>
                                    }



                                    {item.attributes.items && (
                                        <nav className="flex flex-wrap ">
                                            {item.attributes.items.map((itemMenu) => {
                                                if (itemMenu.url && itemMenu.title) {
                                                    return (
                                                        <div className="w-full mb-5" key={itemMenu.id}>
                                                            <Link
                                                                href={itemMenu.url}
                                                                key={`menu-${itemMenu.id}`}
                                                                className=" text-gray-300 transition hover:text-white mb-5"
                                                            >
                                                                <span className="text-yellow-300 pr-3">
                                                                    +
                                                                </span>
                                                                {itemMenu.title}
                                                            </Link>
                                                        </div>
                                                    );

                                                }

                                            })}
                                        </nav>
                                    )}
                                </div>
                            )

                        }



                    })}

















                </div>
            </div>
        </footer>
    )
}



