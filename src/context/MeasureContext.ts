import { createContext, Dispatch, SetStateAction, useContext } from "react";

type MeasureType = "measure" | "measuring" | "measured";

interface MeasureState {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  measureStatus: MeasureType;
  setMeasureStatus: Dispatch<SetStateAction<MeasureType>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

export const MeasureContext = createContext<MeasureState | undefined>(
  undefined,
);

/**
 * useMeasureContext is a custom hook that is used to validate
 * wheather MeasureContextProvider is wraped around the page that we are using.
 *
 * @returns time countdown when user clicks the measure button and places finger on the camera
 * @returns measureStatus depicts current state of the measurement it can backend
 *   measure (idle state), mesuring (when button is clicked and countdown states),
 *   and measured (when the countdown is complete)
 * @constant status is a understandable message given for the user. It is used to tell user wheather they
 *   placed their fingers correctly in the camera, wheather datas are being sent to the server.
 */
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
    status: state.status,
    setStatus: state.setStatus,
  };
}
