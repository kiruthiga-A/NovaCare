"use client";
import Lottie from "lottie-react";
import idle from "../lottie/IdleMeasureButton.json";
import close from "../lottie/CloseMeasureButton.json";
import { useMeasureContext } from "@/context/MeasureContext";

/**
 * Animated MeasureButton component, that runs wavy lottie anmation infinitly
 * onClicked on the button it will change its anmation from idle to shrinking, displays 
 * time countdown, shows status of heartRate measurement ( errors from backend, state of the app ).
 *
 * @param measure function called when the button is clicked, it changes the context state to measuring and 
 * responsible for calling the backend.
 *
 * @returns animated button component
 *
 */
const MeasureButton = ({ measure }: { measure: () => void }) => {
  /**
   * @constant measureStatus depicts current state of the measurement it can backend
   *   measure (idle state), mesuring (when button is clicked and countdown states), 
   *   and measured (when the countdown is complete)
   * @constant time is countdown that runs when the user places their finger correctly on the camera.
   * @constant status is a understandable message given for the user. It is used to tell user wheather they 
   *   placed their fingers correctly in the camera, wheather datas are being sent to the server.
   *
   */
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
          className={`text-center text-xl font-semibold font-poppins text-accentRed delay-500 duration-1000 transition-all ${
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
