const currentSong = document.querySelector(".current-song");
const title = currentSong.querySelector(".title a");  
const singer = currentSong.querySelector(".singer a");  
const songImage = currentSong.querySelector("img");

function playbarSong(trackInfo){
    title.innerText = trackInfo.title;
    singer.innerText = trackInfo.singer;
    songImage.src = trackInfo.image;
}