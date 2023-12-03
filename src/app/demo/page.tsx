"use client";
import AllowCameraAlert from "@/components/AllowCameraAlert";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface Status {
  type: "error" | "sucess";
  description: string;
}

export default function Demo() {
  const [canStart, setCanStart] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const isCompleted = useRef<boolean>(false);
  let requestId: number;

  useEffect(() => {
    const customInterval = setInterval(() => {
      if (canStart) setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      setTime(0);
      clearInterval(customInterval);
    };
  }, [canStart]);

  if (time > 4) isCompleted.current = true;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 100,
          height: 100,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        if (video) video.srcObject = stream;
        video?.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const measureHeartRate = () => {
    let redList: number[] = [],
      timeStamp: number[] = [];

    const getRedList = () => {
      const noiseFactor = 2.0;
      const context = canvasRef.current?.getContext("2d");
      const video = videoRef.current as CanvasImageSource;
      context?.drawImage(video, 0, 0, 100, 100);
      const imgData = context?.getImageData(0, 0, 100, 100).data;

      let redSum = 0,
        greenSum = 0,
        blueSum = 0;
      if (!imgData) return;
      for (let i = 0; i < imgData.length; i += 4) {
        redSum += imgData[i];
        greenSum += imgData[i + 1];
        blueSum += imgData[i + 2];
      }

      let pixelCount = imgData?.length / 4;
      let redAvg = redSum / pixelCount,
        greenAvg = greenSum / pixelCount,
        blueAvg = blueSum / pixelCount;

      let motionArtifactBool =
        redAvg >= noiseFactor * greenAvg && redAvg >= noiseFactor * blueAvg;
      if (!motionArtifactBool) {
        setCanStart(false);
        redList = [];
        timeStamp = [];

        motionArtifactBool = true;
      } else if (redAvg < 20 && !motionArtifactBool) {
        setCanStart(false);
        redList = [];
        timeStamp = [];

        motionArtifactBool = true;
      } else {
        setCanStart(true);
        redList.push(redAvg);
        timeStamp.push(performance.now());

        console.log(redList);

        motionArtifactBool = false;
      }

      requestId = requestAnimationFrame(getRedList);

      if (isCompleted.current) {
        setCanStart(false);
        cancelAnimationFrame(requestId);
      }
    };
    requestAnimationFrame(getRedList);
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-sky-100 space-y-5-0">
      <AllowCameraAlert open />
      <canvas ref={canvasRef}></canvas>

      <Button onClick={measureHeartRate}>Measure</Button>
      <h1>{time}</h1>

      <div className="flex flex-col items-center">
        <video className="w-[100px] h-[100px] rounded-full" ref={videoRef} />
        <button onClick={getVideo}>Record</button>
      </div>
    </main>
  );
}
