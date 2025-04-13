const searchInputBox = document.querySelector(".search-input");
const searchInput = document.querySelector(".search-input input");
const clearButton = document.querySelector("#clear-btn");
const container = document.querySelector(".right");

document.addEventListener("DOMContentLoaded", function () {

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            
            const query = searchInput.value.trim();

            if (query) {
                addClass();
                searchSong(query);

            } else {
                console.warn("Search input is empty.");
            }
        }
    });
});


async function searchSong(query) {

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;

    const data = await fetchData(url);

    if (data && data.tracks && data.tracks.items.length > 0) {
        console.log(data);
        container.innerHTML = "";

        displayTopResult(data.tracks.items[0]);
        createTrack(data.tracks.items[0]);
        displaySongs(data.tracks.items, query, container);
    } else {
        console.warn("No songs found!");
        return [];
    }
}


function createTrack(song){
    console.log("hari bol");
    console.log(song);
    const trackInfo = {
        image: song?.album?.images?.[0]?.url || "",
        title: song.name,
        singer: song.artists[0].name,
    };
    playbarSong(trackInfo);
}



function displayTopResult(song) {
    if (!song) return;

    const sectionDiv = document.createElement("div");
    sectionDiv.innerHTML = `
        <div class="card-section-header flex">
            <h2><a href="#">Top result</a></h2>
        </div>

        <div class="card-section flex"></div>
    `;

    const cardSection = sectionDiv.querySelector(".card-section");

    const topResultDiv = document.createElement("div");
    topResultDiv.classList.add("top-result-container");
        topResultDiv.innerHTML = `
            <div class="img"><img src="${song.album.images[0]?.url}" alt="${song.name}"></div>
            <div class="content">
                <h1><a href="${song.artists[0].external_urls.spotify}" target="_blank">${song.name}</a></h1>
                <p>Song • <a href="${song.artists[0].external_urls.spotify}" target="_blank">${song.artists[0].name}</a></p>
            </div>
            <button class="without-hover"><a href="" target="_blank">
                    <i class="fa-solid fa-circle-play" style="color: #19e68c;"></i>
            </a></button>
        `;

    cardSection.appendChild(topResultDiv);
    container.appendChild(sectionDiv);

    cardHover("top-result-container");
    addEvent(sectionDiv);
}



function displaySongs(songs, query, rightConatiner) {
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("card-section-container");
    sectionDiv.innerHTML = `
        <div class="card-section-header flex">
            <h2><a href="#">Similar Results for "${query}"</a></h2>
            <h5><a href="#">Show All</a></h5>
        </div>

        <div class="scroll-button left-btn flex">
            <button class="leftButton justify align"><i class="fa-solid fa-chevron-left"></i></button>
        </div>
        <div class="scroll-button right-btn flex">
            <button class="rightButton justify align"><i class="fa-solid fa-chevron-right"></i></button>
        </div>

        <div class="card-section flex"></div>
    `;

    const cardSection = sectionDiv.querySelector(".card-section");

    songs.forEach(song => {
        const songImage = song.album.images.length > 0 ? song.album.images[0].url : "";
        const songName = song.name;
        
        const artistLinks = song.artists
            .map(artist => `<a href="${artist.external_urls.spotify}" target="_blank">${artist.name}</a>`)
            .join(", ");

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "flex");
        cardDiv.innerHTML = `
            <div class="img">
                <img src="${songImage}" alt="${songName}">
                <button class="without-hover play-button">
                    <i class="fa-solid fa-circle-play" style="color: #19e68c;"></i>
                </button>
            </div>
            <div class="title"><a>${songName}</a></div>
            <div class="singer"><a>${artistLinks}</a></div>
        `;

        cardSection.appendChild(cardDiv);
    });

    rightConatiner.append(sectionDiv);
    addCardClickListeners(cardSection);

    cardHover("card");
    initializeScrollButtons(cardSection);
    addEvent(sectionDiv);
}





function addClass(){
    clearButton.classList.add("with-text");

    clearButton.addEventListener("click",()=>{
        searchInput.value = "";
    })
}

searchInput.addEventListener("focus",()=>{
    searchInputBox.style.border = "2px solid white";
})

searchInput.addEventListener("blur",()=>{
    searchInputBox.style.border = "2px solid transparent";

    if(searchInput.value==""){
        clearButton.classList.remove("with-text");
        clearButton.classList.add("without-text");
    }
})
