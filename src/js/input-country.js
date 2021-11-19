import { refs } from './refs';

const API_KEY = 'Ci1vLtAQ5toUQm0alN6gL6AfnGn8TpWy';
const BASE_URL = 'https://app.ticketmaster.com/discovery-feed/v2/events?';

async function fetchCountries(countryCode) {
  const promiseCoutries = await fetch(`${BASE_URL}apikey=${API_KEY}`);
  const countryData = promiseCoutries.json();
  return countryData;
}
refs.inputCountry.addEventListener('click', onCountryBtnClick);
async function onCountryBtnClick(e) {
  e.preventDefault();
  try {
    const countryFetch = await fetchCountries(country).then(
      elems => console.log(elems)
      //  onCountryCreate(elems.countries)
    );
  } catch (err) {
    console.log(err);
  }
}
// async function onCountryCreate (obj){
//     const optionEl= Object.keys(obj)
//     console.log(optionEl)
//     const listCountry = optionEl.map((el) => {
//       const itemCountries = `<option class='input-country' value="${el}">${el}</option>`;
//       console.log(itemCountries);
//       return itemCountries;
//     })
//   refs.inputCountry.insertAdjacentHTML('beforeend',listCountry)
// }
