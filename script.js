
    var requestUrl = 'http://gateway.marvel.com/v1/public/comics?ts=1626533266&apikey=ab9297e9d4bda4ab94cb17eb9e3fe843&hash=119e420fb9eb7795c5ab699ee01f8beb';

function getApi() {
    
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }

  getApi();
  