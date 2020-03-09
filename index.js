function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
  }

  function displayResults(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.length; i++){
        console.log(responseJson[i]);
      $('#repo').append(
        `<li><h3><a href="${responseJson[i].name}">${responseJson[i].url}</a></h3>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };

function getRepo(user) {
    const params = {
      sort: "created",
      direction: "asc"
    };
    $('#results').empty();

    const queryString = formatQueryParams(params);
    const url =  'https://api.github.com/users/' + user + '/repos' + '?' + queryString;
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
    
function watchForm() {
    $('form').submit(event => {

      event.preventDefault();
      const searchUser = $('#js-search-term').val();
      getRepo(searchUser);
    });
  }

$(watchForm);