"use client";

import { useCarritoContext } from "@/src/context/CarritoContext";
import Link from "next/link";
import Image from "next/image";

function CarritoBtn({ id }) {
  const { counterProduct } = useCarritoContext();

  return (
    <div className="flex items-center">
      <Link
        href={"/carrito"}
        className="relative text-white flex justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <span className="flex justify-center items-center text-black rounded-full bg-amber-300 text-center w-4 h-4  absolute -top-2 -right-2 text-xs">
          {counterProduct}
        </span>
      </Link>
    </div>
  );
}

export default CarritoBtn;
