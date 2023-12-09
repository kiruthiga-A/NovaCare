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
  const { measureStatus,status } = useMeasureContext();

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
                value="85BPM"
              />
              <ResultTile
                name="HRV"
                imgLink="HRVStandalone.svg"
                value="85BPM"
                style="outline"
              />

              <ResultTile
                name="Relax Level"
                imgLink="RelaxStandalone.svg"
                value="65%"
                style="outline"
              />
              <ResultTile
                name="Respiration"
                imgLink="RespirationStandalone.svg"
                value="12BPM"
              />
              <ResultTile
                name="PRQ"
                imgLink="PQRStandalone.svg"
                value="1.3"
                style="outline"
              />
              <ResultTile
                name="Stress Level"
                imgLink="StressStandalone.svg"
                value="13%"
                style="outline"
              />
              <ResultTile
                name=" Age"
                imgLink="BioAgeStandalone.svg"
                value="18"
                style="outline"
                className="md:col-start-2"
              />
            </div>
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
