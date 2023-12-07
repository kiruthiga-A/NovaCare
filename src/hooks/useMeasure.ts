import axios from "axios";
import { useEffect, useRef, useState } from "react";

type MeasureType = "measure" | "measuring" | "measured";

interface DataType {
  beats_per_minute: number | null;
  respiration_rate: number | null;
}

function useMeasure(timeDuration: number) {
  const [canStartCount, setCanStartCount] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Not Started");
  const [time, setTime] = useState<number>(0);
  const [measureStatus, setMeasureStatus] = useState<MeasureType>("measure");

  const data = useRef<DataType>();
  const isCompleted = useRef<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const redList = useRef<number[]>([]);
  const timeStampList = useRef<number[]>([]);

  let stream: MediaStream, video: HTMLVideoElement | null;

  useEffect(() => {
    const customInterval = setInterval(() => {
      if (canStartCount) setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      setTime(0);
      clearInterval(customInterval);
    };
  }, [canStartCount]);

  if (time > timeDuration) isCompleted.current = true;

  const getVideo = async () => {
    if (!("mediaDevices" in navigator)) return;
    const constraints = {
      video: {
        width: 100,
        height: 100,
        facingMode: "user",
      },
    };

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      video = videoRef.current;
      if (video) video.srcObject = stream;
      video?.play();
    } catch (e) {
      console.log(e);
    }
  };

  const stopVideo = () => {
    stream.getTracks().forEach((track) => track.stop());
  };

  const getData = () => {
    const APIInterval = setInterval(async () => {
      if (redList.current.length < 100) return;
      const option = {
        method: "POST",
        url: process.env.NEXT_PUBLIC_BACKEND_URL,
        withCredentials: false,
        headers: { "Content-Type": "application/json" },
        data: {
          pixel_value: redList.current,
          timestamp: timeStampList.current,
          user_id: "example_user",
          batch_id: "example_batch",
        },
      };
      const res = await axios.request(option);
      data.current = res.data;
      console.log(data.current);
      console.log(redList.current);
    }, 3000);

    return () => clearTimeout(APIInterval);
  };

  const measureHeartRate = () => {
    getVideo();
    setMeasureStatus("measuring");
    let clear: () => ReturnType<typeof clearTimeout> = getData();

    const getRedList = () => {
      const noiseFactor = 2.0;
      const context = canvasRef.current?.getContext("2d", {
        willReadFrequently: true,
      });
      const video = videoRef.current as CanvasImageSource;
      context?.drawImage(video, 0, 0, 100, 100);
      const imgData = context?.getImageData(0, 0, 100, 100).data;
      let requestId: number;

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

      let motionArtifactBool = redAvg >= noiseFactor * greenAvg &&
        redAvg >= noiseFactor * blueAvg;

      if (redAvg === 0 && greenAvg === 0 && blueAvg === 0) {
        setStatus("Setting up camera");
        setCanStartCount(false);
      } else if (!motionArtifactBool) {
        setStatus("Kindly place finger on camera");
        setCanStartCount(false);
        redList.current = [];
        timeStampList.current = [];

        motionArtifactBool = true;
      } else if (redAvg < 20 && !motionArtifactBool) {
        setStatus("Lighting not enough");
        setCanStartCount(false);
        redList.current = [];
        timeStampList.current = [];

        motionArtifactBool = true;
      } else {
        setStatus("Right Position Hold it right there");
        setCanStartCount(true);
        redList.current.push(redAvg);
        timeStampList.current.push(performance.now());

        motionArtifactBool = false;
      }

      requestId = requestAnimationFrame(getRedList);

      if (isCompleted.current) {
        stopVideo();
        setCanStartCount(false);
        setMeasureStatus("measured");
        cancelAnimationFrame(requestId);
        clear();
      }
    };
    requestAnimationFrame(getRedList);
  };

  return {
    measureStatus,
    measureHeartRate,
    data,
    time,
    canvasRef,
    videoRef,
    status,
  };
}

export default useMeasure;
