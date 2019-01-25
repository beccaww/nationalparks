'use strict';

const apiKey = 'vCDp4CW2FS7T4hBPUZa1jXGwILyIPVFTcAw5Dio3';
const parksURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParkInformation(query, maxResults = 10) {
  const params = {
    api_key: apiKey,
    //parkCode: '' ,
    stateCode: query,
    limit: maxResults - 1,
    //start: ,
    q: query,
    //fields: '',
    //sort: '',
  };
  const queryString = formatQueryParams(params)
  const url = parksURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  responseJson.data.forEach(park => {
    $('#results-list').append(
      `<li>
        <h3>${park.name}</h3>
        <p>${park.description}</p>
       </li>`
    );
  });
  //display the results section  
  $('#results-list').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getParkInformation(searchState, maxResults);
  });
}

$(watchForm);