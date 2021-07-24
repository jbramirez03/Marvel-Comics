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
var comicCreators = document.querySelector(".comic-creators");
var goBackBtn = document.querySelector("#go-back");
var nextBtn = document.querySelector("#go-next");
var moreBtn = document.querySelector("#go-more");
var modalFooter = document.querySelector("#footer-modal");

var PRIV_KEY = "b62c40680e3ea3090a2462bc3021628651c2d45f";
var PUBLIC_KEY = "ab9297e9d4bda4ab94cb17eb9e3fe843";

document.querySelector(".search_bar").addEventListener("keyup", function(event){
  if(event.key === "Enter") {
    getCharacterComic();
    searchBtn.classList.add("search_btn_clicked");
    nextBtn.setAttribute("class", "show_next");
    moreBtn.setAttribute("class", "show-more-button");
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
    nextBtn.setAttribute("class", "show_next");
    moreBtn.setAttribute("class", "show-more-button");
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
          var i = 0;
          for(i; i < resultBlocks.length; i++) {
             var comicDescription = newdata.data.results[i].title;
            //  console.log(comicDescription);
            describedComic[i].textContent = comicDescription;
            describedComic[i].classList.add("has-text-centered");
            var imageUrl = newdata.data.results[i].thumbnail.path + ".jpg";
            thumbnails[i].setAttribute("src", imageUrl);
          }
          
            
            for (let j = 0; j < learnMoreBtns.length; j++) {
              learnMoreBtns[j].addEventListener("click", function(){
                var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = newdata.data.results[j].description;
              var available = newdata.data.results[j].creators.available;
              comicCreators.innerHTML = '';
                if (comicSummary === null && available === 0) {
                  comicDescribed.textContent = "No Comic description Available";
                  comicCreators.textContent = "No Creators Listed";
                  modalFooter.textContent = newdata.data.results[j].title;
                } else if (available === 0){
                  modalFooter.textContent = newdata.data.results[j].title;
                  comicDescribed.textContent = comicSummary;
                  comicCreators.textContent = "No Creators Listed";
                } else if (comicSummary === null) {
                  modalFooter.textContent = newdata.data.results[j].title;
                  var creator = newdata.data.results[j].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = "No Comic Description Available";
                } else {
                  modalFooter.textContent = newdata.data.results[j].title;
                  var creator = newdata.data.results[j].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = comicSummary;
                }
                

              })
          }

          var resultIndex = 6;

          nextBtn.addEventListener("click", function (){
            goBackBtn.setAttribute("class", "show_previous");
            nextBtn.setAttribute("class", "show-more-button");
            moreBtn.setAttribute("class", "show_next");
            for(var g = 0; g < resultBlocks.length; g++){
              comicTitle = newdata.data.results[g+resultIndex].title;
              describedComic[g].textContent = comicTitle;
              var imageUrl = newdata.data.results[g+resultIndex].thumbnail.path + ".jpg";
            thumbnails[g].setAttribute("src", imageUrl);
            }
            for (let j = 0; j < learnMoreBtns.length; j++) {
              learnMoreBtns[j].addEventListener("click", function(){
                var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = newdata.data.results[j+resultIndex].description;
              var available = newdata.data.results[j+resultIndex].creators.available;
              comicCreators.innerHTML = '';
                if (comicSummary === null && available === 0) {
                  modalFooter.textContent = newdata.data.results[j+resultIndex].title;
                  comicDescribed.textContent = "No Comic description Available";
                  comicCreators.textContent = "No Creators Listed";
                } else if (available === 0){
                  modalFooter.textContent = newdata.data.results[j+resultIndex].title;
                  comicDescribed.textContent = comicSummary;
                  comicCreators.textContent = "No Creators Listed";
                } else if (comicSummary === null) {
                  modalFooter.textContent = newdata.data.results[j+resultIndex].title;
                  var creator = newdata.data.results[j+resultIndex].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = "No Comic Description Available";
                } else {
                  modalFooter.textContent = newdata.data.results[j+resultIndex].title;
                  var creator = newdata.data.results[j+resultIndex].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = comicSummary;
                }
                

              });
          }
          
        
        
          });
          
          var moreIndex = 12;
           moreBtn.addEventListener("click", function(){
             moreBtn.setAttribute("class", "show-more-button");
            for(var g = 0; g < resultBlocks.length; g++){
              comicTitle = newdata.data.results[g+moreIndex].title;
              describedComic[g].textContent = comicTitle;
              var imageUrl = newdata.data.results[g+moreIndex].thumbnail.path + ".jpg";
            thumbnails[g].setAttribute("src", imageUrl);
            }
            for (let j = 0; j < learnMoreBtns.length; j++) {
              learnMoreBtns[j].addEventListener("click", function(){
                var modalHtml = document.querySelector("#modal");
              modalHtml.classList.add("is-active");
              var comicSummary = newdata.data.results[j+moreIndex].description;
              var available = newdata.data.results[j+moreIndex].creators.available;
              comicCreators.innerHTML = '';
                if (comicSummary === null && available === 0) {
                  modalFooter.textContent = newdata.data.results[j+moreIndex].title;
                  comicDescribed.textContent = "No Comic description Available";
                  comicCreators.textContent = "No Creators Listed";
                } else if (available === 0){
                  modalFooter.textContent = newdata.data.results[j+moreIndex].title;
                  comicDescribed.textContent = comicSummary;
                  comicCreators.textContent = "No Creators Listed";
                } else if (comicSummary === null) {
                  modalFooter.textContent = newdata.data.results[j+moreIndex].title;
                  var creator = newdata.data.results[j+moreIndex].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = "No Comic Description Available";
                } else {
                  modalFooter.textContent = newdata.data.results[j+moreIndex].title;
                  var creator = newdata.data.results[j+moreIndex].creators.items;
                  for (let k = 0; k < creator.length; k++){
                    var createdEL = document.createElement("p");
                    createdEL.textContent = creator[k].name;
                    comicCreators.append(createdEL);
                  }
                  comicDescribed.textContent = comicSummary;
                }
                

              });
          }
          
           });

           goBackBtn.addEventListener("click", function (){
             goBackBtn.setAttribute("class", "go-back-button");
             nextBtn.setAttribute("class", "show_next");
             moreBtn.setAttribute("class", "show-more-button");
            for(var i = 0; i < resultBlocks.length; i++) {
              var comicDescription = newdata.data.results[i].title;
             //  console.log(comicDescription);
             describedComic[i].textContent = comicDescription;
             describedComic[i].classList.add("has-text-centered");
             var imageUrl = newdata.data.results[i].thumbnail.path + ".jpg";
             thumbnails[i].setAttribute("src", imageUrl);
           }
           
             
             for (let j = 0; j < learnMoreBtns.length; j++) {
               learnMoreBtns[j].addEventListener("click", function(){
                 var modalHtml = document.querySelector("#modal");
               modalHtml.classList.add("is-active");
               var comicSummary = newdata.data.results[j].description;
               var available = newdata.data.results[j].creators.available;
               comicCreators.innerHTML = '';
                 if (comicSummary === null && available === 0) {
                  modalFooter.textContent = newdata.data.results[j].title;
                   comicDescribed.textContent = "No Comic description Available";
                   comicCreators.textContent = "No Creators Listed";
                 } else if (available === 0){
                  modalFooter.textContent = newdata.data.results[j].title;
                   comicDescribed.textContent = comicSummary;
                   comicCreators.textContent = "No Creators Listed";
                 } else if (comicSummary === null) {
                  modalFooter.textContent = newdata.data.results[j].title;
                   var creator = newdata.data.results[j].creators.items;
                   for (let k = 0; k < creator.length; k++){
                     var createdEL = document.createElement("p");
                     createdEL.textContent = creator[k].name;
                     comicCreators.append(createdEL);
                   }
                   comicDescribed.textContent = "No Comic Description Available";
                 } else {
                  modalFooter.textContent = newdata.data.results[j].title;
                   var creator = newdata.data.results[j].creators.items;
                   for (let k = 0; k < creator.length; k++){
                     var createdEL = document.createElement("p");
                     createdEL.textContent = creator[k].name;
                     comicCreators.append(createdEL);
                   }
                   comicDescribed.textContent = comicSummary;
                 }
                 
 
               })
           }
           });

        })
    });
}
