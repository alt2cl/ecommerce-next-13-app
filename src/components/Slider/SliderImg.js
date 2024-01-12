"use client";
import React from "react";
//import { Slide } from "react-slideshow-image";
import { Fade } from "react-slideshow-image";
import Image from "next/image";
import "react-slideshow-image/dist/styles.css";
import "./Slider.scss";
import Link from "next/link";
import { fetchStrapiData } from "@/src/lib/api";

//docs: https://react-slideshow-image.netlify.app/?path=/story/examples-responsive--page

export default async function Slider({ data }) {
  return (
    <div
      className="slide-container"
      style={{ height: 400, overflow: "hidden", width: "100%" }}
    >
      <Fade
        nextArrow={
          <button
            style={{
              background: "none",
              border: "0px",
              width: "50px",
              color: "white",
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              height: 300,
              alignItems: "center",
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
              height: 300,
              alignItems: "center",
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
        {data.data.map((slide) => {
          const {
            title,
            subtitle,
            description,
            cover,
            url,
            layout,
            titlebutton,
          } = slide.attributes;

          return (
            <div className="each-slide-effect" key={`slide-${slide.id}`}>
              <div
                style={{
                  backgroundColor: "#000",
                  overflow: "hidden",
                  maxHeight: 400,
                  // backgroundImage: `url(${cover.data?.attributes?.url.replace(
                  //   "upload/",
                  //   "upload/c_fill,h_600,w_1200/"
                  // )})`,
                }}
              >
                <div
                  className="flex"
                  style={{
                    justifyContent:
                      layout == "left"
                        ? "flex-start"
                        : layout == "right"
                        ? "flex-end"
                        : layout == "center"
                        ? "center"
                        : "flex-start",
                    backgroundColor: "rgba(19, 19, 20, 0.41)",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div className="container wrapSliderText">
                    <div
                      className="flex"
                      style={{
                        justifyContent:
                          layout == "left"
                            ? "flex-start"
                            : layout == "right"
                            ? "flex-end"
                            : layout == "center"
                            ? "center"
                            : "flex-start",
                      }}
                    >
                      <div>
                        <Link href={url}>
                          <h3 className="text-4xl lg:text-5xl font-semibold text-gray-100 mb-2">
                            {title}
                          </h3>
                          <p className="text-gray-200 mb-7 text-2xl">
                            {subtitle}
                          </p>
                          {description ? (
                            <p className="text-gray-200 mb-7">{description}</p>
                          ) : null}
                        </Link>
                        {url && (
                          <Link
                            className="rounded-md text-center font-medium px-4 py-2 bg-primary-600 hover:bg-zinc-800 text-white"
                            href={url}
                          >
                            {titlebutton}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Image
                  src={cover.data?.attributes?.url.replace(
                    "upload/",
                    "upload/c_fill,h_400,w_300/"
                  )}
                  width={300}
                  height={400}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    opacity: 0.7,
                    width: "100%",
                  }}
                  className="block md:hidden"
                />
                <Image
                  src={cover.data?.attributes?.url.replace(
                    "upload/",
                    "upload/c_fill,h_400,w_1300/"
                  )}
                  className="hidden md:block"
                  width={1200}
                  height={400}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    opacity: 0.7,
                    width: "100%",
                  }}
                />
              </div>
            </div>
          );
        })}
      </Fade>
    </div>
  );
}
