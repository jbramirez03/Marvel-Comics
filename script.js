var resultBlocks = document.querySelectorAll(".results");
var resultsDescription = document.querySelectorAll(".description");
var imageBlocks = document.querySelectorAll(".image_result");


var PRIV_KEY = "b62c40680e3ea3090a2462bc3021628651c2d45f";
var PUBLIC_KEY = "ab9297e9d4bda4ab94cb17eb9e3fe843";
function getMarvelResponse() {
  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  // the api deals a lot in ids rather than just the strings you want to use
  var characterName = 'steve rogers'; // wolverine                                                                             
  var queryParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&name=${characterName}`;
  var url = `http://gateway.marvel.com/v1/public/characters?${queryParams}`;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var charactersId = data.data.results[0].id;
      console.log(charactersId);
      var newParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&characters=${charactersId}`;
      characterUrl = `http://gateway.marvel.com/v1/public/comics?${newParams}`;
      fetch(characterUrl)
        .then(function (response) {
          return response.json();
        })
        .then (function (newdata) {
          console.log(newdata);


          for(i = 0; i < resultBlocks.length; i++) {
             var comicDescription = newdata.data.results[i].description;
             console.log(comicDescription);
            var descriptionEl = document.createElement("h2");
            descriptionEl.textContent = comicDescription;
            resultsDescription[i].append(descriptionEl);
            var imageUrl = newdata.data.results[i].thumbnail.path + ".jpg";
            var image = document.createElement("img");
            image.setAttribute("src", imageUrl);
            imageBlocks[i].append(image);

          }




        })
    });
}
getMarvelResponse();



