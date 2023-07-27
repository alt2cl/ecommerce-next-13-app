import "./headsection.scss";

export default function HeadSection({ titulo, subtitulo, center }) {
  return (
    // <h1>Head section</h1>
    <div
      className={`wrapHeadSection flex flex-col ${center && "items-center"}`}
    >
      <h2 className="headSection">{titulo}</h2>
      {subtitulo && <p>{subtitulo}</p>}
    </div>
  );
}
