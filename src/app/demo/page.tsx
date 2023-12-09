"use client";
import MeasureButton from "@/components/MeasureButton";
import ResultTile from "@/components/ResultTile";
import { useMeasureContext } from "@/context/MeasureContext";
import useMeasure from "@/hooks/useMeasure";
import HeartBeat from "@/components/HeartBeat";

export default function Demo() {
  const timeDuration: number = 15;
  const {
    data,
    canvasRef,
    measureHeartRate,
    videoRef,
  } = useMeasure(timeDuration);
  const { measureStatus, setMeasureStatus } = useMeasureContext();

  return (
    <main className="w-full h-screen relative flex flex-col items-center justify-center bg-white space-y-5-0">
      <canvas className="hidden" ref={canvasRef}></canvas>
      {measureStatus === "measured"
        ? (
          <div className="w-full h-full flex flex-col items-center  px-8 pt-24">
            <h1 className="text-4xl font-extrabold font-poppins pb-4">
              Result
            </h1>
            <div className="grid grid-cols-2 gap-3 max-w-xs md:max-w-xl md:grid-cols-3">
              <ResultTile
                name="Heart Rate"
                imgLink="HeartRateStandalone.svg"
                value={data.current?.beats_per_minute?.toString() || "Error"}
              />
              <ResultTile
                name="HRV"
                imgLink="HRVStandalone.svg"
                value={data.current?.hrv?.toString() || "Error"}
                style="outline"
              />
              <ResultTile
                name="PRQ"
                imgLink="PQRStandalone.svg"
                value={data.current?.rpq?.toString() || "Error"}
                style="outline"
              />
              <ResultTile
                name="Respiration"
                imgLink="RespirationStandalone.svg"
                value={data.current?.respiration_rate?.toString() || "Error"}
              />
              <ResultTile
                name="Stress Level"
                imgLink="StressStandalone.svg"
                value={data.current?.stress_level?.toString() || "Error"}
                style="outline"
              />
              <ResultTile
                name=" Age"
                imgLink="BioAgeStandalone.svg"
                value={data.current?.heart_age?.toString() || "Error"}
                style="outline"
              />
            </div>
              <h1 className="text-xl text-accentRed pt-8 font-semibold">Want to redo ?? <span className="cursor-pointer" onClick={() => setMeasureStatus("measure")}>Click Here !! </span> </h1>
          </div>
        )
        : (
          <>
            <MeasureButton measure={measureHeartRate} />
            <div
              className={`opacity-0 flex flex-col items-center transition-opacity duration-1000 ${
                measureStatus === "measuring" && "opacity-100"
              }`}
            >
              <HeartBeat heartBeat={data.current?.respiration_rate} />
              <video
                className="absolute bottom-16 w-[100px] bg-red-200 h-[100px] rounded-full"
                ref={videoRef}
              />
            </div>
          </>
        )}
    </main>
  );
}
