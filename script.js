var resultBlocks = document.querySelectorAll(".results");
var resultsDescription = document.querySelectorAll(".description");
var imageBlocks = document.querySelectorAll(".image_result");
var characterInput = document.querySelector("#character-input");
var searchBtn = document.querySelector(".search_btn");
var thumbnails = document.querySelectorAll(".thumbnail");
var describedComic = document.querySelectorAll(".description-text");

var PRIV_KEY = "b62c40680e3ea3090a2462bc3021628651c2d45f";
var PUBLIC_KEY = "ab9297e9d4bda4ab94cb17eb9e3fe843";

// need to add function to run when "enter" is pushed 
document.querySelector(".search_bar").addEventListener("keyup", function(event){
  if(event.key === "Enter") {
    getCharacterComic();
  }
})
// if (event.key == "Enter") 
// to run the same function as below

searchBtn.addEventListener("click", function() {
  getCharacterComic();
});

function getCharacterComic () {

  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var characterChosen = characterInput.value;
  // the api deals a lot in ids rather than just the strings you want to use
  var characterName = characterChosen; // wolverine                                                                             
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
      // console.log(charactersId);
      var newParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&characters=${charactersId}`;
      characterUrl = `http://gateway.marvel.com/v1/public/comics?${newParams}`;
      fetch(characterUrl)
        .then(function (response) {
          return response.json();
        })
        .then (function (newdata) {
          console.log(newdata);


          for(i = 0; i < resultBlocks.length; i++) {

            

             var comicDescription = newdata.data.results[i].title;
            //  console.log(comicDescription);
            describedComic[i].textContent = comicDescription;
            describedComic[i].classList.add("has-text-centered");
            var imageUrl = newdata.data.results[i].thumbnail.path + ".jpg";
            thumbnails[i].setAttribute("src", imageUrl);
            
            

          }




        })
    });
}
// getMarvelResponse();



