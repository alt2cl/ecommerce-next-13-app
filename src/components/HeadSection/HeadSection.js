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
  icon,
}) {
  return (
    <div
      className={`wrapHeadSection flex flex-col ${center && "items-center"} `}
    >
      <div className="flex">
        {icon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
        <h2
          className={`headSection ${playfair.className} ${
            color && color
          } ${fontStyle}`}
        >
          {titulo}
        </h2>
      </div>
      {subtitulo && <p>{subtitulo}</p>}
    </div>
  );
}
