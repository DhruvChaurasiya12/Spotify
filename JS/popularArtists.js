async function fetchPopularArtists() {
    const url = "https://api.spotify.com/v1/search?q=genre:bollywood&type=artist&limit=10";
    const data = await fetchData(url);

    if (!data || !data.artists || !data.artists.items) {
        console.warn("⚠️ No Artists found.");
        return;
    }

    const rightContainer = document.querySelector(".right");
    if (!rightContainer) {
        console.error("⚠️ Container '.right' not found!");
        return;
    }

    displayArtists(data.artists.items);
}

function displayArtists(artists){
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("card-section-container");
    sectionDiv.innerHTML = `
        <div class="card-section-header flex">
            <h2><a href="#">Popular Artists</a></h2>
            <h5><a href="#">Show All</a></h5>
        </div>

        <div class="scroll-button left-btn flex">
            <button class="leftButton justify align"><i class="fa-solid fa-chevron-left"></i></button>
        </div>
        <div class="scroll-button right-btn flex">
            <button class="rightButton justify align"><i class="fa-solid fa-chevron-right"></i></button>
        </div>

        <div class="card-section popular-artist flex">
        </div>
    `;

    const cardSection = sectionDiv.querySelector(".card-section");

    artists.forEach(artist => {
        const artistImage = artist.images.length > 0 ? artist.images[0].url : "";
        const artistName = artist.name;
        const artistURL = artist.external_urls.spotify;

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "flex");
        cardDiv.innerHTML = `
            <div class="img">
                <img src="${artistImage}" alt="${artistName}">
                <button class="without-hover play-button">
                    <i class="fa-solid fa-circle-play" style="color: #19e68c;"></i>
                </button>
            </div>
            <div class="title"><a href="" target="_blank">${artistName}</a></div>
            <div class="singer"><a href="" target="_blank">Artist</a></div>
        `;

        cardSection.appendChild(cardDiv);
    });

    const rightContainer = document.querySelector(".right"); // make sure this exists
    rightContainer.appendChild(sectionDiv);

    addCardClickListeners(cardSection);
    cardHover("card");
    initializeScrollButtons(cardSection);
    addEvent(sectionDiv);
}

fetchPopularArtists();