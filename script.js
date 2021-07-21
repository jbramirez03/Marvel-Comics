var resultBlocks = document.querySelectorAll(".results");
var resultsDescription = document.querySelectorAll(".description");
var imageBlocks = document.querySelectorAll(".image_result");
var characterInput = document.querySelector("#character-input");
var searchBtn = document.querySelector(".search_btn");
var thumbnails = document.querySelectorAll(".thumbnail");
var describedComic = document.querySelectorAll(".description-text");
var learnMoreBtns = document.querySelectorAll("#learn-btn");
var closeModalBtn = document.querySelector("#close-btn");
var comicDescribed = document.querySelector("#comic-description");
var comicCreator = document.querySelector(".comic-creator");

var PRIV_KEY = "b62c40680e3ea3090a2462bc3021628651c2d45f";
var PUBLIC_KEY = "ab9297e9d4bda4ab94cb17eb9e3fe843";

document.querySelector(".search_bar").addEventListener("keyup", function(event){
  if(event.key === "Enter") {
    getCharacterComic();
    searchBtn.classList.add("search_btn_clicked");
    dom[0].setAttribute("class", "search_results");
    for (var i = 0; i < learnMoreBtns.length; i++) {
      learnMoreBtns[i].setAttribute("class","learn_more_clicked");
    }
    
  }
})
var dom = document.getElementsByTagName("html");
// var learnMoreButtons = document.querySelectorAll(".learn_more");
searchBtn.addEventListener("click", function() {
  getCharacterComic();
  searchBtn.classList.add("search_btn_clicked");
  dom[0].setAttribute("class", "search_results");
  for (var i = 0; i < learnMoreBtns.length; i++) {
    learnMoreBtns[i].setAttribute("class","learn_more_clicked");
  }
  
});

closeModalBtn.addEventListener("click", function (){
  var modal = document.querySelector("#modal");
  modal.classList.remove("is-active");
});

function getCharacterComic () {

  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var characterChosen = characterInput.value;
  // the api deals a lot in ids rather than just the strings you want to use
  var characterName = characterChosen; // wolverine                                                                             
  var queryParams = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&name=${characterName}`;
  var url = `https://gateway.marvel.com/v1/public/characters?${queryParams}`;
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
      characterUrl = `https://gateway.marvel.com/v1/public/comics?${newParams}`;
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

            // for (var j = 0; j < learnMoreBtns.length; j++) {
            //   learnMoreBtns[j].addEventListener("click", function(){
            //     var modalHtml = document.querySelector("#modal");
            //   modalHtml.classList.add("is-active");
            //   var comicSummary = newdata.data.results[j].description;
            //     console.log(comicSummary);
            //   })
            // }
            
            learnMoreBtns[0].addEventListener("click",function (){
              var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = newdata.data.results[0].description;
              var creator = newdata.data.results[0].creators.items[0].name;
              if (comicSummary === null){
                comicDescribed.textContent = "No Comic Description Available";
                comicCreator.textContent = creator;
              } else {
              comicDescribed.textContent = comicSummary;
              comicCreator.textContent = creator;
              }
            });
            learnMoreBtns[1].addEventListener("click",function (){
              var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = newdata.data.results[1].description;
              var creator = newdata.data.results[1].creators.items[0].name;
              if (comicSummary === null){
                comicDescribed.textContent = "No Comic Description Available";
                comicCreator.textContent = creator;
              } else {
              comicDescribed.textContent = comicSummary;
              comicCreator.textContent = creator;
              }
            });
            learnMoreBtns[2].addEventListener("click",function (){
              var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = newdata.data.results[2].description;
              var creator = newdata.data.results[2].creators.items[0].name;
              if (comicSummary === null){
                comicDescribed.textContent = "No Comic Description Available";
                comicCreator.textContent = creator;
              } else {
              comicDescribed.textContent = comicSummary;
              comicCreator.textContent = creator;
              }
            });
            learnMoreBtns[3].addEventListener("click",function (){
              var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = newdata.data.results[3].description;
              var creator = newdata.data.results[3].creators.items[0].name;
              if (comicSummary === null){
                comicDescribed.textContent = "No Comic Description Available";
                comicCreator.textContent = creator;
              } else {
              comicDescribed.textContent = comicSummary;
              comicCreator.textContent = creator;
              }
            });
            learnMoreBtns[4].addEventListener("click",function (){
              var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = newdata.data.results[4].description;
              var creator = newdata.data.results[4].creators.items[0].name;
              if (comicSummary === null){
                comicDescribed.textContent = "No Comic Description Available";
                comicCreator.textContent = creator;
              } else {
              comicDescribed.textContent = comicSummary;
              comicCreator.textContent = creator;
              }
            });
            learnMoreBtns[5].addEventListener("click",function (){
              var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = newdata.data.results[5].description;
              var creator = newdata.data.results[5].creators.items[0].name;
              if (comicSummary === null){
                comicDescribed.textContent = "No Comic Description Available";
                comicCreator.textContent = creator;
              } else {
              comicDescribed.textContent = comicSummary;
              comicCreator.textContent = creator;
              }
            });
          
        })
    });
}
