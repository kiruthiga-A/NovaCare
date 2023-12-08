"use client";
import Lottie from "lottie-react";
import data from "../lottie/MeasureButtonFull.json";
import close from "../lottie/MeasureButtonClose.json";
import { useState } from "react";

interface prop {
  time: number;
  measure: () => void;
}

const MeasureButton = ({ time, measure }: prop) => {
  const [isOpen, setOpen] = useState<boolean>(true);
  return (
    <div className="relative">
      {isOpen
        ? (
          <Lottie
            onClick={() => {
              setOpen(false);
              measure()
            }}
            initialSegment={[0, 115]}
            className="max-w-md cursor-pointer"
            animationData={data}
          />
        )
        : <Lottie loop={false} className="max-w-md" animationData={close} />}
      <div
        onClick={() => setOpen(true)}
        className={`absolute top-1/2 left-1/2  ${
          isOpen ? "opacity-0" : "translate-y-[-50%] opacity-100"
        } translate-x-[-50%] delay-700 transition-all	`}
      >
        <h1 className=" text-center text-white font-poppins font-black text-8xl">
          {time}
        </h1>
      </div>
    </div>
  );
};

export default MeasureButton;
