import heart from "../lottie/Heart.json";
import Lottie from "lottie-react";

export default function HeartBeat({ heartBeat }: { heartBeat: number | null | undefined }) {
  return (
    <h1 className="flex items-center text-3xl font-poppins">
      <Lottie className="w-10" animationData={heart} />{" "}
      {heartBeat || "Calculating"}
    </h1>
  );
}
