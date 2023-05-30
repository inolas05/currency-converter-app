import React, { useState, useEffect } from 'react';
  import './App.css';

  const App = () => {
    const [sourceCurrency, setSourceCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [conversionHistory, setConversionHistory] = useState([]);
    const [exchangeRates, setExchangeRates] = useState({});
    const [currencyOptions, setCurrencyOptions] = useState([]);

    useEffect(() => {
      fetch('/api/exchangeRates')
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data)[0];
          setCurrencyOptions([...Object.keys(data)]);
          setSourceCurrency(firstCurrency)
          setTargetCurrency(firstCurrency)
        })
    }, [])

    useEffect(() => {
      const fetchExchangeRates = async () => {
        try {
          const response = await fetch('/api/exchangeRates');
          const data = await response.json();
          setExchangeRates(data);
        } catch (error) {
          console.error('Failed to fetch exchange rates:', error);
        }
      };

      fetchExchangeRates();
    }, []);

    const handleConvert = () => {
      try {
        const rate = exchangeRates[sourceCurrency] && exchangeRates[sourceCurrency][targetCurrency];
        if (!rate) {
          throw new Error(`Exchange rate not found for ${sourceCurrency} to ${targetCurrency}`);
        }

        const convertedAmount = amount * rate;
        setConvertedAmount(convertedAmount);

        const newConversion = {
          sourceCurrency,
          targetCurrency,
          amount,
          convertedAmount,
        };

        setConversionHistory([newConversion, ...conversionHistory.slice(0, 9)]);
      } catch (error) {
        console.error('An error occurred during the conversion:', error);
        setConvertedAmount("Exchange rate not available for the given currency");
      }
    };

    return (
      <div className="App">
        <div>
          <h1>Currency Converter</h1>
          <div>
            <input
              className='input'
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="From Amount"
            />
            <select className='selector' value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)}>
              {currencyOptions.map(option => (
                  <option id={option} key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              className='input'
              type="number" 
              value={convertedAmount}
              placeholder="To Amount"
            />
            <select className='selector' value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
              {currencyOptions.map(option => (
                  <option id={option} key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <button className='button' onClick={handleConvert}>Convert</button>
          </div>
        </div>
        <div>
          <h2>Conversion History</h2>
          <table id='history'>
            <thead>
              <tr>
                <th>From Amount</th>
                <th>Source Currency</th>
                <th>To Amount</th>
                <th>Target Currency</th>
              </tr>
            </thead>
            <tbody>
              {conversionHistory.map((conversion, index) => (
                <tr key={index}>
                  <td>{conversion.amount}</td>
                  <td>{conversion.sourceCurrency}</td>
                  <td>{conversion.convertedAmount}</td>
                  <td>{conversion.targetCurrency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default App;