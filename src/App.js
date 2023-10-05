import React, { useState, useEffect } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const hundredths = time % 100;

  return (
    <div className="App items-center justify-center ">
      <div className="text-5xl text-center text-bold my-10">The Stopwatch</div>
      <div className="bg-gray-800 border-spacing-1 p-4 text-center rounded-lg border-coral-red text-white text-7xl">
        <span>{String(hours).padStart(2, "0")}:</span>
        <span>{String(minutes).padStart(2, "0")}:</span>
        <span>{String(seconds).padStart(2, "0")}:</span>
        <span>{String(hundredths).padStart(2, "0")}</span>
      </div>

      <div className="flex flex-row items-center justify-center text-4xl my-5 mx-5">
        <button
          onClick={() => {
            setTimerOn(true);
          }}
          className="mx-5 my-2 p-2 bg-green-500 rounded-lg text-white"
        >
          Start
        </button>
        <button
          onClick={() => {
            setTimerOn(false);
          }}
          className="mx-5 my-2 p-2 bg-red-500 rounded-lg text-white"
        >
          Stop
        </button>
        <button
          onClick={() => {
            setTimerOn(true);
          }}
          className="mx-5 my-2 p-2 bg-yellow-500 rounded-lg text-white"
        >
          Resume
        </button>
        <button
          onClick={() => {
            setTime(0);
            setTimerOn(false);
          }}
          className="mx-5 my-2 p-2 bg-blue-500 rounded-lg text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
