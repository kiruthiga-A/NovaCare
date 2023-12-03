"use client";
import { Button } from "@/components/ui/button";
import useMeasure from "@/hooks/useMeasure";

export default function Demo() {
  const { canvasRef, time, measureHeartRate, videoRef, status } = useMeasure();

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-sky-100 space-y-5-0">
      <canvas className="hidden" ref={canvasRef}></canvas>

      <div className="flex flex-col items-center">
        <Button className={``} onClick={measureHeartRate}>
          Measure
        </Button>
        <h1>{time}</h1>
        <h1>{status}</h1>
        <video className="w-[100px] h-[100px] rounded-full" ref={videoRef} />
      </div>
    </main>
  );
}
