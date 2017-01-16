const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data)); //... - "split into" function

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex); //city or state
    });
}

function generateHTML(cityName, stateName, population) {
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
      </li>
    `;
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    suggestions.innerHTML = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi'); //global & case insensitive
        const spanExp = `<span class="hl">${this.value}</span>`;
        return generateHTML(place.city.replace(regex, spanExp), place.state.replace(regex, spanExp), place.population);
    }).slice(0, 5).join('');
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
