"use client";

import { useState, useEffect } from "react";
import { useCarritoContext } from "@/src/context/CarritoContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdStoreBtn({ product, imagen, nombre, precio }) {
  const { agregarCarrito, setCounterProduct, counterProduct } =
    useCarritoContext();
  const [cantidad, setCantidad] = useState(0);

  const pathname = usePathname();

  console.log("pathname:", pathname);

  useEffect(() => {
    setCounterProduct(counterProduct + Number(cantidad));
  }, []);

  const pedirViaWhatsapp = (productoSeleccionado) => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cantidad < 1) {
      alert("Cantidad invalida");
      return;
    }

    //construir un objeto
    const productoSeleccionado = {
      id: product.data[0].id,
      imagen: imagen?.data[0]?.attributes?.url,
      nombre,
      precio,
      cantidad,
    };

    //pasando la informacion al carrito

    pedirViaWhatsapp(productoSeleccionado);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="formulario border-gray-100 p-4 mt-5 bg-slate-300 rounded"
      >
        <div className="grid grid-cols-2 gap-5 mb-5">
          <label htmlFor="cantidad">Cantidad</label>
          <select id="cantidad" onChange={(e) => setCantidad(+e.target.value)}>
            <option value="0">--Seleccione--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        {/* <input
          type="submit"
          value="Solicitar vía WhatsApp"
          className="block w-full p-3 text-center bg-green-600 hover:bg-slate-900 text-white rounded"
        /> */}

        <Link
          href={`https://wa.me/+56974270756?text=Me interesan ${cantidad} de este producto: https://cafemas.cl/${pathname}`}
          className="rounded-md text-center p-2 bg-green-500 hover:bg-slate-900 text-white flex justify-center"
          target="_blank"
          alt={"Pedir via WhatsApp::" + nombre}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            className="h-6 w-6"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
          Solicitar producto
        </Link>
      </form>
    </div>
  );
}

export default AdStoreBtn;
