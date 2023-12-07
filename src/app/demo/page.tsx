"use client";
import ResultTile from "@/components/ResultTile";
import { Button } from "@/components/ui/button";
import useMeasure from "@/hooks/useMeasure";

export default function Demo() {
  const timeDuration: number = 15;
  const {
    data,
    measureStatus,
    canvasRef,
    time,
    measureHeartRate,
    videoRef,
    status,
  } = useMeasure(timeDuration);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-white space-y-5-0">
      <canvas className="hidden" ref={canvasRef}></canvas>

      {measureStatus === "measure" && (
        <Button className={``} onClick={measureHeartRate}>
          Measure
        </Button>
      )}
      {measureStatus === "measuring" && (
        <>
          <h1>{time}</h1>
          <h1>{status}</h1>
          <video
            className="w-[100px] h-[100px] rounded-full"
            ref={videoRef}
          />
          <h1>{data.current?.respiration_rate || "Wait"}</h1>
        </>
      )}
      {measureStatus === "measured" && (
        <div className="w-full h-full flex flex-col items-center  px-8 pt-24">
          <h1 className="text-4xl font-extrabold font-poppins pb-4">Result</h1>
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
      )}
    </main>
  );
}
