document.getElementById('convertBtn').addEventListener('click', function() {
    const amount = document.getElementById('amount').value;
    const currencyFrom = document.getElementById('currencyFrom').value;
    const currencyTo = document.getElementById('currencyTo').value;
    const resultField = document.getElementById('result');
    const errorField = document.getElementById('error');

    if (currencyFrom === currencyTo) {
        resultField.value = amount;
        errorField.textContent = '';
        return;
    }

    const url = `https://api.exchangerate.host/latest?base=${currencyFrom}&symbols=${currencyTo}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('API əlçatmazdır');
            }
            return response.json();
        })
        .then(data => {
            const rate = data.rates[currencyTo];
            const convertedAmount = (amount * rate).toFixed(2);
            resultField.value = convertedAmount;
            errorField.textContent = '';
        })
        .catch(error => {
            resultField.value = '';
            errorField.textContent = 'Nəyinsə səhv getdiyi barədə mesaj: ' + error.message;
        });
});