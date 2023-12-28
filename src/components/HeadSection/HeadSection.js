import { Playfair_Display } from "next/font/google";

import "./headsection.scss";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeadSection({
  titulo,
  subtitulo,
  center,
  color,
  fontStyle,
}) {
  return (
    <div
      className={`wrapHeadSection flex flex-col ${center && "items-center"} `}
    >
      <h2
        className={`headSection ${playfair.className} ${
          color && color
        } ${fontStyle}`}
      >
        {titulo}
      </h2>
      {subtitulo && <p>{subtitulo}</p>}
    </div>
  );
}
