"use client";
import { Button } from "@/components/ui/button";
import useMeasure from "@/hooks/useMeasure";

export default function Demo() {
  const timeDuration : number = 15;
  const { measureStatus, canvasRef, time, measureHeartRate, videoRef, status } =
    useMeasure(timeDuration);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-sky-100 space-y-5-0">
      <canvas className="hidden" ref={canvasRef}></canvas>

      <div className="flex flex-col items-center">
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
          </>
        )}
      </div>
    </main>
  );
}
