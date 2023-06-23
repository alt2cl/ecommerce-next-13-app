import "./headsection.scss";

export default function HeadSection({ titulo, subtitulo, center }) {
  console.log("titulo y sub:", titulo, subtitulo);
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
