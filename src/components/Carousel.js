"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function Carousel({ arrayImage, passId }) {
  let widthCarousel = 1500;

  const idCarousel = "carousel-product";

  let viewableElements = 3;

  const [widthwrapcarousel, setwidthwrapcarousel] = useState(0);

  const [positionCarousel, setPositionCarousel] = useState(0);

  useEffect(() => {
    setwidthwrapcarousel(document.getElementById(passId).offsetWidth);
  }, []);

  const carouselItems = arrayImage.map((img) => (
    <div
      className="list-item-carousel"
      style={{ minWidth: widthwrapcarousel }}
      key={img.attributes.url}
    >
      <Image
        src={img.attributes.url}
        alt="img"
        width={img.attributes.width}
        height={img.attributes.height}
        className={"rounded-xl"}
      />
    </div>
  ));

  const nextCarousel = (direccion, widthItem) => {
    const wrapcarousel = document.getElementById(passId);

    const widthWrapperCarousel = wrapcarousel.offsetWidth;

    let maxRight = carouselItems.length * widthItem + 500; //3*409= 1227

    if (direccion === "r") {
      //positionCarousel = positionCarousel - widthItem //0-409= -409

      if (
        positionCarousel <= 0 &&
        positionCarousel >= (maxRight - widthItem * carouselItems.length) * -1
      ) {
        wrapcarousel.style.left = positionCarousel - widthItem + "px"; //debe dar -315

        setPositionCarousel(positionCarousel - widthItem);
      } else {
        (wrapcarousel.style.left = "0px"), setPositionCarousel(0);
      }
    } else if (direccion === "l") {
      if (positionCarousel < 0) {
        wrapcarousel.style.left = positionCarousel + widthItem + "px";
        setPositionCarousel(positionCarousel + widthItem);
      } else {
        (wrapcarousel.style.left = "0px"), setPositionCarousel(0);
      }
    }
  };

  return (
    <div className="wrapper-carousel-metro">
      <div className="wrap-control-carousel">
        <div className="control-carousel">
          <a
            className="left-control controlbtn text-black"
            onClick={() => nextCarousel("l", widthwrapcarousel)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </a>
          <a
            className="left-control controlbtn text-black"
            onClick={() => nextCarousel("r", widthwrapcarousel)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </a>
        </div>
      </div>

      <div
        className="results-list-container results-list-carousel-container"
        id={passId}
      >
        {carouselItems}
      </div>
    </div>
  );
}

export default Carousel;
