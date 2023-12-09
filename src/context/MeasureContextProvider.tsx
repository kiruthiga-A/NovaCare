'use client'
import { ReactNode, useState } from "react";
import { MeasureContext } from "./MeasureContext";

interface props {
  children: ReactNode;
}

type MeasureType = "measure" | "measuring" | "measured";

export default function MeasureContextProvider({ children }: props) {
  const [time, setTime] = useState<number>(0);
  const [measureStatus, setMeasureStatus] = useState<MeasureType>("measure");
  const [status, setStatus] = useState<string>("Not Started");

  return (
    <MeasureContext.Provider
      value={{ time, setTime, measureStatus, setMeasureStatus, status, setStatus }}
    >
      {children}
    </MeasureContext.Provider>
  );
}
