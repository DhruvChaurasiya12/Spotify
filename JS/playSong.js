const rightConatiner = document.querySelector(".right");

document.addEventListener("click", function (e) {
    if (e.target.closest(".play-button")) {
        const card = e.target.closest(".card");

        const img = card.querySelector("img")?.src || "No image found";
        const title = card.querySelector(".title")?.textContent.trim() || "No title";
        const singer = card.querySelector(".singer")?.textContent.trim() || "No singer";

        const trackInfo = {
            image: img,
            title: title,
            singer: singer
        };

        playbarSong(trackInfo);
    }

});


function addCardClickListeners(cardSection) {
    cardSection.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("click", () => {
            displaySelectedSong(card);
        });
    });
}


async function searchSimilarSongs(query) {

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;

    const data = await fetchData(url);

    if (data && data.tracks && data.tracks.items.length > 0) {
        createTrack(data.tracks.items[0]);
        displaySongs(data.tracks.items, query, rightConatiner);
    }
    else {
        console.warn("No songs found!");
        return [];
    }
}


function displaySelectedSong(card) {

    const image = card.querySelector("img").src;
    const title = card.querySelector(".title a").innerText;
    const singer = card.querySelector(".singer a").innerText;
    
    rightConatiner.innerHTML = "";

    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("display-song")
    sectionDiv.innerHTML = `
        <div class="song-section flex"></div>
    `;

    const songSection = sectionDiv.querySelector(".song-section");

    songSection.innerHTML = `
            <div class="img"><img src="${image}" alt=""></div>
            <div class="content">
                <h1><a href="" target="_blank">${title}</a></h1>
                <p>Song • <a href="" target="_blank">${singer}</a></p>
            </div>
            <button class="without-hover"><a href="" target="_blank">
                <i class="fa-solid fa-circle-play" style="color: #19e68c;"></i>
            </a></button>
    `

    rightConatiner.appendChild(sectionDiv);
    cardHover("display-song");

    searchSimilarSongs(title);
}