"use client";

import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Slider.scss";
import Link from "next/link";

export default async function Slider({ promise }) {
  const data = await promise;
  return (
    <Slide>
      {data.map((slide) => {
        const { titulo, subtitulo, descripcion, imagen, enlace, layouts } =
          slide.attributes;

        return (
          <div className="each-slide-effect" key={`slide-${slide.id}`}>
            <div
              style={{
                backgroundImage: `url(${imagen.data.attributes.formats.medium.url})`,
              }}
            >
              <div
                className="container flex"
                style={{
                  justifyContent:
                    layouts == "izquierda"
                      ? "flex-start"
                      : layouts == "derecha"
                      ? "flex-end"
                      : layouts == "centrado"
                      ? "center"
                      : "flex-start",
                }}
              >
                <div className="wrapSliderText">
                  <h3 className="text-2xl">{titulo}</h3>
                  <p className="text-gray-600">{subtitulo}</p>
                  {enlace && <Link href={enlace}>Conoce +</Link>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slide>
  );
}
