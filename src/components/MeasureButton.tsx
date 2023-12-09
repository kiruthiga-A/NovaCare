"use client";
import Lottie from "lottie-react";
import idle from "../lottie/IdleMeasureButton.json";
import close from "../lottie/CloseMeasureButton.json";
import { useMeasureContext } from "@/context/MeasureContext";

const MeasureButton = ({ measure }: { measure: () => void }) => {
  const { measureStatus, time, status } = useMeasureContext();

  return (
    <div className="relative">
      <div
        className={`relative max-w-sm ${
          measureStatus === "measuring" && "translate-y-[-80px] max-w-[300px]"
        } delay-500 transition-all duration-1000`}
      >
        {measureStatus === "measure"
          ? <Lottie animationData={idle} />
          : <Lottie loop={false} animationData={close} />}
        <h1
          className={`text-center text-xl md:text-2xl font-semibold font-poppins text-accentRed delay-500 duration-1000 transition-all ${
            measureStatus === "measuring"
              ? "opacity-100"
              : "opacity-0 translate-y-5 "
          }`}
        >
          {status}
        </h1>
        <div className=" absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] ">
          <h1
            onClick={measure}
            className={`cursor-pointer font-poppins font-black ${
              measureStatus === "measuring" ? "text-9xl" : "text-4xl"
            } text-white transition-all delay-500 duration-500 text-center`}
          >
            {measureStatus === "measure" ? "Measure" : time}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MeasureButton;
