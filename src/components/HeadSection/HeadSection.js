import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});

console.log("FONT playfair: ", playfair);

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
      className={`wrapHeadSection flex flex-col mb-5 ${
        center && "items-center"
      } `}
    >
      <div
        className={`flex flex-col ${
          center ? "lg:flex-col " : "lg:flex-row "
        } items-center`}
      >
        {icon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="6"
            stroke="#fbd508"
            class="w-6 h-6 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
        <h2
          className={`headSection font-bold text-xl lg:text-3xl lg:text-nowrap  ${
            playfair.style.fontFamily
          } ${color && color} ${fontStyle}`}
        >
          {titulo}
        </h2>
        <hr className="lg:grow border-t-2 lg:ml-5 w-10 my-3 border-primary-500" />
      </div>
      {subtitulo && <p>{subtitulo}</p>}
    </div>
  );
}
