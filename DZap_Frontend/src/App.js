import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [cryptoList, setCryptoList] = useState([]);
    const [sourceCrypto, setSourceCrypto] = useState('');
    const [amount, setAmount] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('usd');
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/crypto-list')
            .then(response => setCryptoList(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:5000/api/convert', { params: { sourceCrypto, amount, targetCurrency } })
            .then(response => setConvertedAmount(response.data.convertedAmount))
            .catch(error => console.error(error));
    };

    return (
        <div className="container">
            <div className='form_container'>
                    <div className='title'>
                        <h1>Currency Converter</h1>
                    </div>
                <div className="form-box">
                    <form onSubmit={handleSubmit}>
                        <div className="formInner">
                            <div className='cryptoNames'>
                                <select onChange={(e) => setSourceCrypto(e.target.value)} value={sourceCrypto}>
                                    
                                    {cryptoList.map(crypto => (
                                        <option className='crytoOption' key={crypto.id} value={crypto.id}>{crypto.name}</option>
                                    ))}
                                </select>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <select onChange={(e) => setTargetCurrency(e.target.value)} value={targetCurrency}>
                                <option value="usd">USD</option>
                                <option value="eur">EUR</option>
                                {/* Add more currencies as needed */}
                            </select>
                            </div>
                            <button className="btn" type="submit">Convert</button>
                        </div>
                    </form>
                    {convertedAmount && <p className='result'>Converted Amount: {convertedAmount}</p>}
                </div>
            </div>
        </div>
    );
}

export default App;
