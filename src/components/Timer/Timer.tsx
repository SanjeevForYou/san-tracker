import React, { useState, useEffect } from "react";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import "./timer.css";

enum TimerState {
  START,
  RUNNING,
  PAUSED,
}

interface ITimerDisplay {
  hours: number;
  minutes: number;
  seconds: number;
}

export function Timer() {
  const [timerState, setTimerState] = useState<TimerState>(TimerState.START);
  const [timerStartTime, setTimerStartTime] = useState(0);
  const [timerCurrentTime, setTimerCurrentTime] = useState(0);
  const [timeInterval, setTimeInterval] = useState<any>();

  const [timerDisplay, setTimerDisplay] = useState<ITimerDisplay>();

  useEffect(() => {
    getShowTime();
    return () => {};
  }, [timerCurrentTime, timerStartTime]);

  const getShowTime = () => {
    const differentInTime = timerCurrentTime - timerStartTime;
    const hours = Math.floor(
      (differentInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (differentInTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((differentInTime % (1000 * 60)) / 1000);
    //const milliseconds = Math.floor((differentInTime % (1000 * 60)) / 100);

    const timeDisplayData: ITimerDisplay = {
      hours,
      minutes,
      seconds,
    };

    console.log("Timer Data", differentInTime, timeDisplayData);
    setTimerDisplay(timeDisplayData);
  };

  const startTimer = () => {
    if (timerState !== TimerState.PAUSED) {
      setTimerStartTime(Date.now());
      setTimerCurrentTime(Date.now());
    } else {
      setTimerCurrentTime(Date.now());
    }

    const interval = setInterval(() => {
      setTimerCurrentTime(Date.now());
    }, 1000);
    setTimeInterval(interval);
    setTimerState(TimerState.RUNNING);
  };

  const pauseTimer = () => {
    clearInterval(timeInterval);
    setTimeInterval(null);
    setTimerState(TimerState.PAUSED);
  };

  const endTimer = () => {
    clearInterval(timeInterval);
    setTimeInterval(null);
    setTimerState(TimerState.START);
  };

  const padTimeNumber = (timeNumber: number = 0) =>
    timeNumber < 10 ? "0" + timeNumber.toString() : timeNumber.toString();

  return (
    <div id="timerContainer">
      <div className="timer" onClick={startTimer}>
        {timerState !== TimerState.START ? (
          <div>
            <span>
              {padTimeNumber(timerDisplay?.hours)} :{" "}
              {padTimeNumber(timerDisplay?.minutes)} :{" "}
              {padTimeNumber(timerDisplay?.seconds)}
            </span>
          </div>
        ) : (
          "Start Timer !"
        )}
      </div>
      <div className="timer-controls">
        {timerState !== TimerState.RUNNING ? (
          <div className="startTimer reset" onClick={startTimer}>
            <AiOutlinePlayCircle />
          </div>
        ) : null}

        {timerState !== TimerState.START ? (
          <>
            {timerState !== TimerState.PAUSED ? (
              <div className="pauseTimer reset" onClick={pauseTimer}>
                <AiOutlinePauseCircle />
              </div>
            ) : null}

            <div className="resetTimer reset" onClick={endTimer}>
              End
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
