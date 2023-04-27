
const RATE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json';

module.exports = {
    async convertToUah(price) {
        const response = await fetch(RATE_URL)
        const [usdRate] = await response.json();

        return (price * usdRate.rate).toFixed(2);
      }
}