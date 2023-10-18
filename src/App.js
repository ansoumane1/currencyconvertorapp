import React, { useState, useEffect } from 'react';
import './style.css';

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
export default function App() {
  const [amount, setAmount] = useState(1);
  const [currency1, setCurrency1] = useState('EUR');
  const [currency2, setCurrency2] = useState('USD');
  const [output, setOuput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convertCurrency() {
        try {
          setIsLoading(true);
          const resp = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency1}&to=${currency2}`
          );

          if (!resp.ok) throw new Error('somenthing went wrong to fetch data');

          const data = await resp.json();
          console.log(data);
          if (data.Response === 'False') throw new Error('data not found!');
          setOuput(data.rates[currency2]);
          setIsLoading(false);
        } catch (err) {
          console.log(err.message);
          setIsLoading(false);
        }
      }
      if (currency1 === currency2) setOuput(amount);
      convertCurrency();
    },
    [amount, currency1, currency2]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={currency1}
        onChange={(e) => setCurrency1(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
      </select>
      <select
        value={currency2}
        onChange={(e) => setCurrency2(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
      </select>
      {isLoading ? (
        <Loader />
      ) : (
        <p>
          {output}
          {currency2}
        </p>
      )}
    </div>
  );
}

function Loader() {
  return <p>Loading...</p>;
}
