"use client";

import React from "react";
import { Slide } from "react-slideshow-image";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Slider.scss";
import Link from "next/link";

export default async function Slider({ promise }) {
  const data = await promise;
  return (
    <div className="slide-container">
      <Slide
        nextArrow={
          <button
            style={{
              background: "none",
              border: "0px",
              width: "50px",
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        }
        prevArrow={
          <button
            style={{
              background: "none",
              border: "0px",
              width: "50px",
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        }
      >
        {data?.map((slide) => {
          const { titulo, subtitulo, descripcion, imagen, enlace, layouts } =
            slide.attributes;

          return (
            <div className="each-slide-effect" key={`slide-${slide.id}`}>
              <div
                style={{
                  backgroundImage: `url(${imagen.data?.attributes?.formats.medium.url})`,
                }}
              >
                <div
                  className="flex"
                  style={{
                    justifyContent:
                      layouts == "izquierda"
                        ? "flex-start"
                        : layouts == "derecha"
                        ? "flex-end"
                        : layouts == "centrado"
                        ? "center"
                        : "flex-start",
                    backgroundColor: "rgba(19, 19, 20, 0.41)",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <div className="container wrapSliderText">
                    <div
                      className="flex"
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
                      <div>
                        <h3 className="text-3xl text-gray-100">{titulo}</h3>
                        <p className="text-gray-400 mb-7">{subtitulo}</p>
                        {enlace && (
                          <Link
                            className="rounded-md text-center p-2 bg-orange-500 hover:bg-slate-900 text-white"
                            href={enlace}
                          >
                            Conoce +
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}
