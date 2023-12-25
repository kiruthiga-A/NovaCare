interface props {
  name: string;
  value: string;
  style?: string;
  className?: string;
  imgLink: string;
}

/**
 * ResultTile is a reusable component that is used to 
 * display final parameter that is being calculated by the backend server at the end when measurement is over.
 *
 * @param imgLink path of the SVG icon that depicts the parameter, mostly from public folder.
 * @param name parameter's name wheater HeartRate, HeartRateVariablity, RespiratoryRate, StressLevel etc.,
 * @param value result of the paramter received from the backend server, like 10BPM from the backend.
 * @param style weather the tile is fill inside or just outline
 * @param className other custom styling given for a Tile
 *
 */
const ResultTile = (
  { imgLink, name, value, style = "fill", className }: props,
) => {
  return (
    <div
      className={`flex shadow shadow-3xl flex-col items-center justify-center w-40 h-52 rounded-2xl ${
        style === "fill"
          ? "bg-gradient-to-b from-sky-400 to-sky-300"
          : " border-accentBlue-hover border-4"
      } ${className}`}
    >
      <img src={imgLink} className="w-2/3 " />
      <h1
        className={`${
          style === "fill" ? "text-white" : "text-accentBlue-hover"
        } font-bold text-2xl pt-3`}
      >
        {name}
      </h1>
      <h1
        className={`${
          style === "fill" ? "text-white" : "text-accentBlue-hover"
        } text-xl font-black`}
      >
        {value}
      </h1>
    </div>
  );
};

export default ResultTile;
