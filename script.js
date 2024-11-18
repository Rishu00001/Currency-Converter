const fromAmountElement = document.querySelector("#amount");
const convertedAmountElement = document.querySelector("#convertedAmount");
const fromCurrencyElement = document.querySelector("#fromCurrency");
const toCurrencyElement = document.querySelector("#toCurrency");
const resultElement = document.querySelector(".result");
const converterContainer = document.querySelector(".container")
//array to populate the select tags with these countries
const countries = [
  { code: "USD", name: "United States Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "BRL", name: "Brazilian Real" },
];
//Showing countries from array to select tag
countries.forEach((country) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = country.code;
  option1.textContent =
    option2.textContent = `${country.code}(${country.name})`;
  fromCurrencyElement.appendChild(option1);
  toCurrencyElement.appendChild(option2);

  //Setting default values of select tag
  fromCurrencyElement.value = "USD";
  toCurrencyElement.value = "INR";
});

const getExhangeRate =async () => {
  const amount = parseFloat(fromAmountElement.value);
  const fromcurrency = fromCurrencyElement.value;
  const tocurrency = toCurrencyElement.value;
  resultElement.textContent = "Calculating.."
  // fetch data from api
  try{
    const response = await fetch(
        `https://v6.exchangerate-api.com/v6/e3572b24225895f808384ee5/latest/${fromcurrency}`
      );
      const data = await response.json();
      console.log(data)
      const conversionrate = data.conversion_rates[tocurrency];
      const convertedAmount = amount * conversionrate
      convertedAmountElement.value = convertedAmount.toFixed(2)
      resultElement.textContent = `${amount} ${fromcurrency} = ${convertedAmount.toFixed(2)} ${tocurrency}`
  }catch(error){
    converterContainer.innerHTML = `<h2>Error 404</h2>`
  }
};
fromAmountElement.addEventListener('input',getExhangeRate)
fromCurrencyElement.addEventListener('change',getExhangeRate)
toCurrencyElement.addEventListener('change',getExhangeRate)
window.addEventListener('load',getExhangeRate)
