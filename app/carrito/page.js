"use client";

import { useEffect, useState } from "react";
import { useCarritoContext } from "@/src/context/CarritoContext";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-16827119-17fb-4d7e-9996-386fbb445fe5");

export default function CarritoPage(props) {
  const { color, carrito, actualizarCantidad, eliminarProducto, paginaLista } =
    useCarritoContext();
  const [total, setTotal] = useState(0);
  const [cantProductos, setCantProductos] = useState(0);

  console.log("carrito context", carrito);

  const preferenceObject = {
    title: "Producto de prueba",
    category: "categoria del producto",
    description: "descripcion del producto",
    image:
      "https://fastly.picsum.photos/id/277/200/300.jpg?hmac=8wIsJ0ZOFtBSrTpSE0M37XZG2dXMzDTL2_dgppOaP0Y",
    price: 990,
  };

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (totalams, producto) => totalams + producto.cantidad * producto.precio,
      0
    );
    const cantidadProductos = carrito.reduce((previo, acumulado) => {
      return previo + acumulado.cantidad;
    }, 0);
    setTotal(calculoTotal);
    setCantProductos(cantidadProductos);
    //setCounterProduct(cantidadProductos)
    //setCantProductosTotal(cantidadProductos)
  }, [carrito]);

  return paginaLista ? (
    <div>
      <div className="container px-4 pt-9">
        <div className="grid lg:grid-cols-12 lg:gap-12">
          <main className="col-span-12 lg:col-span-7 mb-8">
            <div>
              {carrito.length === 0
                ? "Carrito vacio"
                : carrito.map((producto) => (
                    <div
                      key={producto.id}
                      className="flex bg-white mb-4 relative rounded"
                    >
                      <div>
                        <Image
                          src={producto.imagen}
                          width={200}
                          height={200}
                          alt={`Imagen de ${producto.nombre}`}
                          className="rounded mr-2"
                        />
                      </div>
                      <div className="flex-1 p-3">
                        <h4 className="text-md text-slate-700 font-semibold mb-2">
                          {producto.nombre}
                        </h4>
                        <p className="text-lg text-slate-800 font-semibold mb-4">
                          Precio: ${producto.precio}
                        </p>
                        <div className="flex flex-row items-center justify-between pr-5">
                          <div className="cantidad-select mr-2 rounded-full bg-slate-300 px-3 py-2 ">
                            <label htmlFor="" className="mr-3">
                              Cantidad
                            </label>
                            <select
                              onChange={(e) =>
                                actualizarCantidad({
                                  id: producto.id,
                                  cantidad: e.target.value,
                                })
                              }
                              value={producto.cantidad}
                            >
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
                          <p className=" text-lg font-semibold text-slate-800">
                            Subtotal: $ {producto.cantidad * producto.precio}
                          </p>
                        </div>
                      </div>
                      <button
                        className="bg-primary-600 text-center p-3 col-span-1 absolute right-0 rounded"
                        type="button"
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}
            </div>
          </main>
          <aside className="block col-span-12 lg:col-span-5">
            <div className="mb-5 p-4 bg-white">
              <h5 className="text-lg font-semibold mb-3">Resumen:</h5>
              <div className="flex justify-between">
                <p className="mb-5">Total a Pagar:</p>
                <p className="mb-5 font-semibold text-lg">${total}</p>
              </div>

              <Link
                href={"/carrito/envio"}
                className="rounded text-center bg-primary-600 p-2 block w-full"
              >
                Continuar compra
              </Link>
            </div>

            <div className="mb-5 p-4 bg-white">
              <div id="quantity">{cantProductos}</div>
              <div id="unit-price">{total}</div>

              <div id="wallet_container"></div>

              <button
                id="checkout-btn"
                onClick={() => {
                  axios
                    .post("http://127.0.0.1:3001/payment", preferenceObject)
                    .then(
                      (res) =>
                        (window.location.href =
                          res.data.response.body.init_point)
                    );
                }}
              >
                Checkout
              </button>
              <Wallet initialization={{ preferenceId: "<PREFERENCE_ID>" }} />
              <div id="button-checkout"></div>
            </div>

            <div className="mb-5 p-4 bg-white">
              <h5 className="text-lg font-semibold mb-3">
                Métodos de envio y costos
              </h5>
              <p>Foto de tarjetas</p>
            </div>

            <div className="mb-5 p-4 bg-white">
              <h5 className="text-lg font-semibold mb-3">Métodos de pago</h5>
              <p>Foto de tarjetas</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  ) : null;
}
