
let input = document.getElementById("SearchField")
let button = document.getElementById("button");
let results = document.getElementById("results-container");
let playButton;
let avatar;
let artworkURL;

input.addEventListener("keypress", function(e) {
  if (e.which == 13 || e.keycode == 13) {
    let string = document.getElementById("SearchField").value;
    fetchRequest(string);
    document.getElementById("results-container").innerHTML = ""
    document.getElementById("SearchField").value = ""
  }
})

function fetchRequest(string) {
 fetch ("https://api.soundcloud.com/tracks/?client_id=86b6a66bb2d863f5d64dd8a91cd8de94&q=" + string)
  .then(
   function(response) {
    if (response.status !==200) {
        console.log("something went wrong dummy!!! " + response.status);
    return;
   }
     response.json().then(function(data) {
      let returnedData = data;
      insert(returnedData);
    })
   })
};

function insert(data) {
 for (let i=0; i < 8; i++) {
  artworkURL = data[i].artwork_url;
  if (artworkURL == null) {
   artworkURL = "images/notHere.jpg";
  }
  else {
   artworkURL = `${data[i].artwork_url}`
  }
   let markup = `
    <div class="grid-item">
     <ul class="track-box">
      <li class="album-art"><img class="avatar" src="${artworkURL}"></li>
      <li class="band-name">${data[i].user.username}</li>
      <li class="song-title">${data[i].title}</li>
     </ul>
      <button class="play-button" value="${data[i].stream_url}/?client_id=86b6a66bb2d863f5d64dd8a91cd8de94"><i class="fa fa-play" aria-hidden="true"></i>Play</button>
    </div>
          `
     results.innerHTML += markup;
   }
  }
    results.addEventListener("click", function(e) {
     if (e.target && e.target.nodeName == "BUTTON") {
      let url = e.target.value;
      let player = document.getElementById("audio");
       if (player.className == "pause") {
        player.removeAttribute("class");
        player.classList.add("play");
        player.removeAttribute("src");
        player.setAttribute("src", url);
        e.target.innerHTML = null
        e.target.innerHTML = "<i class=\"fa fa-pause\" aria-hidden=\"true\"></i>"
        player.play();
     } else if (player.className == "play") {
        player.removeAttribute("class");
        player.classList.add("pause");
        e.target.innerHTML = null
        e.target.innerHTML = "<i class=\"fa fa-play\" aia-hidden=\"true\"></i>"
        player.pause();
      }
     }
    });
