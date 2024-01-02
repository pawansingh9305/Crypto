const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get('/api/crypto-list', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint for currency conversion
app.get('/api/convert', async (req, res) => {
    const { sourceCrypto, amount, targetCurrency } = req.query;
    try {
        // Fetch the current rate for the source cryptocurrency in the target currency
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
                ids: sourceCrypto,
                vs_currencies: targetCurrency
            }
        });
        const rate = response.data[sourceCrypto][targetCurrency];
        const convertedAmount = rate * amount;
        res.json({ convertedAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
