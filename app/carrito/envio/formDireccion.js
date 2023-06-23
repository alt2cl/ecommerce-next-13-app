import React, { useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { handlePost } from "./../../api/strapi/api";
import useUpdate from "../../api/strapi/useUpdate";

import { Map } from "./../../utils/map";

function formDireccion({ dataUser, inputMailUser }) {
  const {
    update,
    data: dataUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useUpdate(
    `/clientes?populate=direccions&filters[mail][$eq]=${inputMailUser}`
  );

  console.log("dataUser from direction", dataUser);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [inputDireccion1User, setInputDireccion1User] = useState("");
  const [inputDireccion2User, setInputDireccion2User] = useState("");
  const [success, setSuccess] = useState(null);

  const [direccion, setDireccion] = useState({
    data: {
      direccion: inputDireccion1User,
      referencia: inputDireccion2User,
      cliente: [2],
      postalcode: "555555",
    },
  });

  const handleSubmitDireccion = (e) => {
    e.preventDefault();

    console.log("success:", success, direccion);

    handlePost(direccion, "direccions");
  };

  const handleChangeInputDireccion1 = (value) => {
    //setInputDireccion2User(e.target.value)
    //e.preventDefault()

    setDireccion((current) => {
      const data = { ...current.data };
      data.direccion = value;
      return { ...current, data };
    });
  };

  const handleChangeInputDireccion2 = (e) => {
    //setInputDireccion2User(e.target.value)
    e.preventDefault();

    setDireccion((current) => {
      const data = { ...current.data };
      data.referencia = e.target.value;
      return { ...current, data };
    });
  };

  console.log("direccion:::", direccion.data);

  const handleSubmitUpdateAddress = (e) => {
    e.preventDefault();

    const reqBody = {
      data: {
        nombre: "",
        apellido: "",
        mail: inputMailUser,
        rut: "",
        telefono: "",
      },
    };

    update(reqBody);
  };

  return (
    <form onSubmit={(e) => handleSubmitDireccion(e)}>
      <div className="mb-4">
        <label htmlFor="inputDireccion" className="label-input">
          Calle y número, comuna, ciudad
        </label>
        <div className="relative">
          {isLoaded && (
            <Map
              errorMessage={<span className="errormsg"></span>}
              valueDirection={handleChangeInputDireccion1}
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="inputDireccion2" className="label-input">
          Dpto. / Casa / Oficina / Condominio (opcional)
        </label>
        <div className="relative">
          <input
            type="text"
            id="inputDireccion2"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Dpto. / Casa / Oficina / Condominio (opcional)"
            value={direccion.data.referencia}
            onChange={(e) => handleChangeInputDireccion2(e)}
          />
        </div>
      </div>

      {success ? <div className="mb-4">{success}</div> : null}

      <button
        type="submit"
        className="inline-block rounded-lg bg-gray-500 px-5 py-3 text-sm font-medium text-white"
      >
        Guardar Direccion...
      </button>
    </form>
  );
}

export default formDireccion;
