import { useMeasureContext } from "@/context/MeasureContext";
import heart from "../lottie/Heart.json";
import Lottie from "lottie-react";

/**
 * displays heartBeat value dynamically that is being fetched from the backend server,
 *
 * @param heartBeat is the realtime heart rate value in BPM sent from the server. 
 *
 * @returns component that play a heart beat lotttie infinitly along with the heartBeat value
 *
 */
export default function HeartBeat({ heartBeat }: { heartBeat: number | null | undefined }) {
  return (
    <h1 className="flex items-center text-3xl font-poppins">
      <Lottie className="w-10" animationData={heart} />{" "}
      {heartBeat || "Calculating"}
    </h1>
  );
}
