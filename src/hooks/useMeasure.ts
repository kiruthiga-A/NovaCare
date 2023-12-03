import { useState, useEffect, useRef } from "react";

function useMeasure() {
  const [canStart, setCanStart] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Not Started");
  const [time, setTime] = useState<number>(0);

  const isCompleted = useRef<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    getVideo();
    let redList: number[] = [],
      timeStamp: number[] = [];

    const getRedList = () => {
      const noiseFactor = 2.0;
      const context = canvasRef.current?.getContext("2d");
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

      let motionArtifactBool =
        redAvg >= noiseFactor * greenAvg && redAvg >= noiseFactor * blueAvg;

      if (redAvg === 0 && greenAvg === 0 && blueAvg === 0) {
        setStatus("Setting up camera");
        setCanStart(false);
      } else if (!motionArtifactBool) {
        setStatus("Kindly place finger on camera");
        setCanStart(false);
        redList = [];
        timeStamp = [];

        motionArtifactBool = true;
      } else if (redAvg < 20 && !motionArtifactBool) {
        setStatus("Lighting not enough");
        setCanStart(false);
        redList = [];
        timeStamp = [];

        motionArtifactBool = true;
      } else {
        setStatus("Right Position Hold it right there");
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

  return { measureHeartRate, time, canvasRef, videoRef, status, canStart };
}

export default useMeasure;
