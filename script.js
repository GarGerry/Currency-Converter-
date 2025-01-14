document.getElementById('currencyForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Ambil nilai input dari user
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const resultDiv = document.getElementById('result');

  // Validasi jumlah yang dimasukkan
  if (!amount || amount <= 0) {
    resultDiv.innerHTML = "Please enter a valid amount!";
    return;
  }

  try {
    const apiKey = '3ebe2ccf9eeea2aaef280201'; // API Key
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    // Mengambil data dari API
    const response = await fetch(url);
    const data = await response.json();

    // Menangani respon API yang error
    if (data.result === 'error') {
      resultDiv.innerHTML = `Error: ${data['error-type']}`;
    } else {
      // Menyusun nilai konversi dan menampilkannya
      const rate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }
  } catch (error) {
    resultDiv.innerHTML = "Error fetching conversion rate.";
    console.error("Error:", error); // Menampilkan error di konsol
  }
});