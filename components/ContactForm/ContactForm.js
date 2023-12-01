"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const ContactForm = (sitekey) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const captcharef = useRef(null);

  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const onChangeRecaptcha = (value) => {
    //console.log("cambio en recaptcha", value);
    setRecaptchaValue(value);
  };

  const onSubmit = async (data) => {
    if (!recaptchaValue) {
      //console.log("data on submit", data);
      alert("Por favor, confirma que no eres un robot.");
      return;
    }

    // Aquí puedes enviar `data` a tu backend
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts`,
        {
          data: {
            name: data.name,
            email: data.email,
            message: data.message,
          },
        }
      );

      if (response.status === 200) {
        alert("Mensaje enviado exitosamente");
      }
    } catch (error) {
      console.error("Hubo un error enviando el mensaje", error);
    }
  };

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  console.log("recaptchaSiteKey: ", recaptchaSiteKey);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Nombre
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          type="text"
          {...register("name", { required: "Este campo es obligatorio" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          type="email"
          {...register("email", { required: "Este campo es obligatorio" })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Mensaje
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          {...register("message", { required: "Este campo es obligatorio" })}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-xs italic">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <ReCAPTCHA
          ref={captcharef}
          sitekey={recaptchaSiteKey}
          onChange={onChangeRecaptcha}
        />
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
