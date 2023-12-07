interface props {
  name: string;
  value: string;
  style?: string;
  className?: string;
  imgLink: string;
}

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
