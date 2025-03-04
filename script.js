const apiKey = 'your_api_key'; // Replace with your own API key
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
let currencyRates = {};

async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        currencyRates = data.rates;
        const currencyList = Object.keys(currencyRates);
        currencyList.forEach(currency => {
            document.getElementById('fromCurrency').innerHTML += `<option value="${currency}">${currency}</option>`;
            document.getElementById('toCurrency').innerHTML += `<option value="${currency}">${currency}</option>`;
        });
        document.getElementById('fromCurrency').value = 'USD';
        document.getElementById('toCurrency').value = 'EUR';
    } catch (error) {
        document.getElementById('result').innerText = 'Failed to load currencies';
    }
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    if (amount <= 0) {
        document.getElementById('result').innerText = 'Please enter a valid amount';
        return;
    }
    const convertedAmount = (amount * currencyRates[toCurrency] / currencyRates[fromCurrency]).toFixed(2);
    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

fetchCurrencies();