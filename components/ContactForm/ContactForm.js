"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const ContactForm = () => {
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contacts`,
        {
          name: data.name,
          email: data.email,
          message: data.message,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          {...register("name", { required: "Este campo es obligatorio" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: "Este campo es obligatorio" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Mensaje</label>
        <textarea
          {...register("message", { required: "Este campo es obligatorio" })}
        ></textarea>
        {errors.message && <p>{errors.message.message}</p>}
      </div>

      <div>
        <ReCAPTCHA
          ref={captcharef}
          sitekey={recaptchaSiteKey}
          onChange={onChangeRecaptcha}
        />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;
