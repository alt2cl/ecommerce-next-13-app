//"use client";

import Image from "next/image";
import Link from "next/link";

import imagen1 from "@/public/img/pronto/img1.png";
import imagen2 from "@/public/img/pronto/img2.png";

export default async function Home() {
  return (
    <main
      style={{
        backgroundColor: "#f3b23f",
        marginTop: "-90px",
        position: "relative",
        zIndex: 40,
      }}
    >
      <div
        className="container px-4 pt-9"
        style={{ backgroundColor: "#f3b23f" }}
      >
        <div className="grid lg:grid-cols-12">
          <div className="col-span-6 lg:col-span-5">
            <Image src={imagen1} />
          </div>
          <div className="col-span-6 lg:col-span-7">
            <Image src={imagen2} />
            <Link href={"/home"}>__</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
