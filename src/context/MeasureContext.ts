import { createContext, Dispatch, SetStateAction, useContext } from "react";

type MeasureType = "measure" | "measuring" | "measured";

interface MeasureState {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  measureStatus: MeasureType;
  setMeasureStatus: Dispatch<SetStateAction<MeasureType>>;
  status : string; 
  setStatus: Dispatch<SetStateAction<string>>;
}

export const MeasureContext = createContext<MeasureState | undefined>(
  undefined,
);

export function useMeasureContext() {
  const state = useContext(MeasureContext);

  if (state === undefined) {
    throw new Error("useSideBarContext got a undefined value");
  }

  return {
    time: state.time,
    setTime: state.setTime,
    measureStatus: state.measureStatus,
    setMeasureStatus: state.setMeasureStatus,
    status : state.status,
    setStatus : state.setStatus
  };
}
