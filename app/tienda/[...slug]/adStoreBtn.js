"use client";

import { useState, useEffect } from "react";
import { useCarritoContext } from "@/src/context/CarritoContext";

function AdStoreBtn({ product, imagen, nombre, precio }) {
  const { agregarCarrito, setCounterProduct, counterProduct } =
    useCarritoContext();
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    setCounterProduct(counterProduct + Number(cantidad));
  }, []);

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

    agregarCarrito(productoSeleccionado);
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
        <input
          type="submit"
          value="Agregar al carrito"
          className="block w-full p-3 text-center bg-primary-500 hover:bg-slate-900 text-white rounded"
        />
      </form>
    </div>
  );
}

export default AdStoreBtn;
