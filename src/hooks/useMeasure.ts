import { useMeasureContext } from "@/context/MeasureContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface DataType {
  beats_per_minute: number | null;
  respiration_rate: number | null;
  rpq: number | null;
  hrv: number | null;
  stress_level: number | null;
  heart_age : number | null;
}

/**
 * useMeasure Hook handles entire logic of getting 
 *  - starting camera
 *  - checking weather user placed finger on camera correctly
 *  - starts and increment timer countdown
 *  - average red, blue and green from the camera
 *  - requests data from the backend 
 *
 *  @param timeDuration is the duration of the heart rate measurement test,
 *    when the timer reaches given timeDuration it will change the state of
 *    measurement to "mesured", and displays the result.
 *
 *  @returns measureHeartRate is a function that starts camera and requestAnimationFrame
 *    which recursivly gets called and collects redAvg along with timestamp
 *  @returns data which is response from the backend after sending the redAvg and timeStampList 
 *    it inclues the services provided @type{DataType}
 *  @returns videoRef ReactRef that plays video recorder from the users camera in realtime
 *  @returns canvasRef which is generally hidden and used to calculate avgRed by capturing image from video
 *    and looping through each pixel and adding it to the list.
 */
function useMeasure(timeDuration: number) {
  const [canStartCount, setCanStartCount] = useState<boolean>(false);
  const { time, setTime, setMeasureStatus, setStatus } =
    useMeasureContext();

  const data = useRef<DataType | null>(null);
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
      data.current = null;
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

  const stopVideo =  () => {
    stream?.getTracks().forEach((track) => track.stop());
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
    }, 3000);

    return () => clearTimeout(APIInterval);
  };

  const measureHeartRate = () => {
    getVideo();
    setMeasureStatus("measuring");
    data.current = null; 
    let clear: () => ReturnType<typeof clearTimeout> = getData();

    /**
     * getRedList sets the image from video at a unit time to the canvasRef 
     * and loops through every pixels of image and sums red, blue, green value from rbg value
     * returned seperatly and calculete their average per pixel. It checks weather 
     * user placed finger on the camera depending upon avgRed.
     *
     * This function is called recursivly using requestAnimationFrame which matches number of calls
     * to the refresh rate of the users device. 
     * o
     */
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

      /**
       * Is base case for ending the loop and moving to show the result page.
       */
      if (isCompleted.current) {
        stopVideo();
        setCanStartCount(false);
        setMeasureStatus("measured");
        cancelAnimationFrame(requestId);
        setTime(0)
        isCompleted.current = false;
        redList.current = [];
        timeStampList.current = []
        clear();
      }
    };
    requestAnimationFrame(getRedList);
  };

  return {
    measureHeartRate,
    data,
    canvasRef,
    videoRef,
  };
}

export default useMeasure;
