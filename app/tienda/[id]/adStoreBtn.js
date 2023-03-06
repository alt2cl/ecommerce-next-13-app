'use client'


import { useState } from "react";
import {useCarritoContext} from "@/context/CarritoContext";

function AdStoreBtn({ product,imagen, nombre, precio }) {

    const {agregarCarrito} = useCarritoContext();
    const [cantidad, setCantidad] = useState(0)

    const handleSubmit = e => {
        e.preventDefault()

        if(cantidad < 1){

            alert('Cantidad invalida')
            return

        }

        //construir un objeto
        const productoSeleccionado = {
            id: product.data[0].id,
            imagen: imagen.data.attributes.formats.medium.url,
            nombre,
            precio,
            cantidad
        }

        //pasando la informacion al carrito

        agregarCarrito(productoSeleccionado)


    }

    return (
        <div>

            <form onSubmit={handleSubmit} className="formulario border-gray-100 p-5 mt-10 bg-slate-300">
                <div className="grid grid-cols-2 gap-5 mb-5">
                    <label htmlFor="cantidad">Cantidad</label>
                    <select id="cantidad" onChange={e=> setCantidad(+e.target.value)}>
                        
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
                <input type="submit" value="Agregar al carrito" className="block w-full p-3 text-center bg-black text-white" />
                
            </form>
            
        </div>
    );
}

export default AdStoreBtn;