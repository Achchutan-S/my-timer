import React, { useState, useEffect } from "react";

const exchangeRates = {
  USD: {
    EUR: 0.85, // 1 USD to EUR
    GBP: 0.73, // 1 USD to GBP
  },
  EUR: {
    USD: 1.18, // 1 EUR to USD
    GBP: 0.86, // 1 EUR to GBP
  },
  GBP: {
    USD: 1.37, // 1 GBP to USD
    EUR: 1.16, // 1 GBP to EUR
  },
};

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConversion = () => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      const converted = (
        numericAmount * exchangeRates[fromCurrency][toCurrency]
      ).toFixed(2);
      setConvertedAmount(converted);
    } else {
      // Handle invalid input here
      setConvertedAmount(null);
    }
  };

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

      <div className="App items-center justify-center bg-slate-700">
        <div className="text-5xl text-center text-bold my-10">
          Currency Converter
        </div>
        <div className="flex flex-row items-center justify-center text-4xl my-5 mx-5">
          <div className="mx-5 my-2">
            <label className="text-white">Amount:</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 rounded-lg bg-gray-100 text-gray-900"
            />
          </div>
          <div className="mx-5 my-2">
            <label className="text-white">From Currency:</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="p-2 rounded-lg bg-gray-100 text-gray-900"
            >
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-5 my-2">
            <label className="text-white">To Currency:</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="p-2 rounded-lg bg-gray-100 text-gray-900"
            >
              {Object.keys(exchangeRates[fromCurrency]).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-4xl text-white mt-5 text-center">
          {convertedAmount !== null
            ? `${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}`
            : "Enter a valid numeric amount to convert."}
        </div>
        <button
          onClick={handleConversion}
          className="mx-5 my-2 p-2 bg-blue-500 rounded-lg text-white "
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default App;
