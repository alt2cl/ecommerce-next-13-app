"use client";

import React, { useState, useEffect } from "react";
import { useCarritoContext } from "@/src/context/CarritoContext";
import ContainerDiv from "./presentational/containerDiv";
import Card from "./presentational/card";

import FormNuevoComprador from "./formNuevoComprador";
import FormDireccion from "./formDireccion";
import Steps from "./steps";

//import { handlePost } from "./../../api/strapi/api";
import useFetch from "../../api/strapi/useFetch";
import usePost from "../../api/strapi/usePost";

function isValidEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);

  //   return email.value.match(
  //     @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
  //     RegexOptions.IgnoreCase,
  //     TimeSpan.FromMilliseconds(250)
  // )
}

export default function Envio(props) {
  const [inputMailUser, setInputMailUser] = useState("");
  const [mailEnviado, setMailEnviado] = useState(false);
  const { data, loading, error } = useFetch(
    `/clientes?populate=direccions&filters[mail][$eq]=${inputMailUser}`
  );
  const { post, loading: postLoading, error: postError } = usePost("/clientes");

  const [dataUser, setDataUser] = useState(null);
  const [dataAddress, setDataAddress] = useState("");
  const [inputError, setInputError] = useState(null);
  const [inputErrorEmail, setInputErrorEmail] = useState("");
  const [pasos, setPasos] = useState(null);
  const [showFormAddAddress, setShowFormAddAddress] = useState(false);
  const [showBtnAddAddress, setShowBtnAddAddress] = useState(false);
  const [showFormDatos, setShowFormDatos] = useState(false);

  // const { request } = useFetch(
  //   `/clientes?populate=direccions&filters[mail][$eq]=${inputMailUser}`
  // );

  //const { handlePost } = useFetch(`/clientes`);

  useEffect(() => {
    console.log("useEFFECT::::::::::", dataUser);
  });

  // const fetchData = fetchDataFromApi(`/clientes?populate=direccions&filters[mail][$eq]=${inputMailUser}`)

  // const validateDateUser = (data, inputMailUser) => {
  //   if (data.data.length === 0) {
  //     handlePost(
  //       {
  //         data: {
  //           nombre: "",
  //           apellido: "",
  //           mail: inputMailUser,
  //           rut: "",
  //           telefono: "",
  //         },
  //       },
  //       "clientes"
  //     );
  //   } else {
  //     setDataUser(data);
  //   }

  //   setPasos(2);
  // };

  const sendDataAddress = (event) => {
    console.log(event.target.value);
    setDataAddress(event.target.value);
  };

  const handleChangeInputMail = (e) => {
    //e.preventDefault();
    const email = e.target.value;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(email)) {
      setInputErrorEmail("Ingresar un email valido");
      setInputMailUser(email);
    } else {
      setShowBtnAddAddress(true);
      setInputErrorEmail("OK");
      setInputMailUser(email);

      // if (data?.data?.length == 0) {
      //   setInputMailUser(email);
      // } else {
      //   setInputErrorEmail("Tenemos tu mail");
      //   //setDataUser(data.data);
      // }
    }
  };

  const handleSubmitMail = (e) => {
    e.preventDefault();

    if (data.data.length == 0 && mailEnviado == false) {
      //console.log("ENTRE", data.data);
      const reqBody = {
        data: {
          nombre: "",
          apellido: "",
          mail: inputMailUser,
          rut: "",
          telefono: "",
        },
      };
      post(reqBody, "/clientes");
    } else {
      console.log("data lenght !=0", data.data);
      setShowFormDatos(true);
    }
    //setShowBtnAddAddress(false);
    setMailEnviado(true);
    //setShowFormAddAddress(true);
    //setPasos(2);
  };

  return (
    <div className="container px-4 pt-9">
      <main className="mb-8">
        <Steps pasos={2} />

        {dataUser?.data?.length == 0 ? (
          //Input de registro de nuevo usuario
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <ContainerDiv
              title="Donde recibiras tu compra?"
              msj="Ingresa tus datos de contacto y dirección"
            >
              <FormDireccion dataUser={dataUser.data} />
            </ContainerDiv>
            <ContainerDiv>
              <FormNuevoComprador inputMailUser={inputMailUser} />
            </ContainerDiv>
          </div>
        ) : dataUser?.data?.length > 0 ? (
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
              <h1 className="text-2xl font-bold sm:text-3xl">
                ¿Donde enviamos tu pedido?
              </h1>

              <p className="mt-4 text-gray-500">
                Estas son tus direcciones registradas
              </p>
            </div>
            <ContainerDiv msj="Estas son tus direcciones registradas">
              <>
                {dataUser.attributes.direccions.data?.map((item, i) => (
                  <Card key={"listdirections" + i}>
                    <label htmlFor={"address" + i}>
                      <input
                        name="addressselect"
                        type="radio"
                        id={"address" + i}
                        value={item.id}
                        //checked={dataAddress === item.id}
                        onChange={sendDataAddress}
                      />
                      <strong>Dirección {i + 1} : </strong>
                      <span> {item.attributes.direccion} ,</span>
                      <span>
                        <strong> {item.attributes.comuna}</strong> ,
                      </span>
                      <span>{item.attributes.ciudad}</span>
                    </label>
                  </Card>
                ))}
                <div className="flex items-end justify-between">
                  <button
                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    onClick={() => console.log(dataAddress)}
                  >
                    continuar
                  </button>
                </div>
              </>
            </ContainerDiv>
          </div>
        ) : (
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <ContainerDiv
              title="Dejanos tus datos"
              msj="Si ya haz comprado con nosotros y tenemos tu mail te facilitaremos el proceso, si es tu primera vez ingresa tu mail y te registraremos... comencemos!"
            >
              <>
                <form onSubmit={handleSubmitMail}>
                  <div className="mb-4">
                    <label htmlFor="email" className="label-input">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Tu email..."
                        value={inputMailUser}
                        onChange={(e) => handleChangeInputMail(e)}
                      />

                      <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </span>
                    </div>
                    <span>{inputErrorEmail != "OK" && inputErrorEmail}</span>
                  </div>

                  {showBtnAddAddress ? (
                    <div className="flex items-end justify-between">
                      <button
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        type="submit"
                      >
                        Agrega una dirección
                      </button>
                    </div>
                  ) : null}
                </form>
              </>
            </ContainerDiv>

            {showFormDatos ? (
              <ContainerDiv title="Agrega una dirección">
                <FormDireccion
                  dataUser={data.data}
                  inputMailUser={inputMailUser}
                />
              </ContainerDiv>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
