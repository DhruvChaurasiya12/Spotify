const header = document.createElement("header");
header.classList.add("flex","align");
header.innerHTML = `
    <div class="flex">
        <button id="All">
            <span><h4>All</h4></span>
        </button>
        <button id="Music">
            <span><h4>Music</h4></span>
        </button>
        <button id="Podcasts">
            <span><h4>Podcasts</h4></span>
        </button>
    </div>
`

function addHeader(rightContainer){
    rightContainer.append(header);
}

const buttons = document.querySelectorAll(".right header div button");

buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        buttons.forEach((button)=>{
            button.style.backgroundColor = "#232323";
            button.style.color = "white";
        })
        
        button.style.backgroundColor = "white";
        button.style.color = "black"

        const containers = document.querySelectorAll(".card-section-container");
        containers.forEach((container)=>{
            container.remove();
        })

        if(button.id == "All"){
            fetchPopularArtists();
            fetchPopularAlbums();
        }
        else if(button.id == "Music") fetchPopularAlbums();
        else {}
    })
})


async function fetchRandomTracks() {
    const url = "https://api.spotify.com/v1/recommendations?limit=10&seed_genres=pop,rock,hip-hop";

    const data = await fetchData(url);

    if (!data || !data.tracks || data.tracks.length === 0) {
        console.warn("⚠️ No Random Tracks found.");
        return;
    }

    displayRandomTracks(data.tracks);
}

function displayRandomTracks(tracks) {
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("card-section-container");
    sectionDiv.innerHTML = `
        <div class="card-section-header flex">
            <h2><a href="#">Random Music</a></h2>
            <h5><a href="#">Shuffle Again</a></h5>
        </div>

        <div class="scroll-button left-btn flex">
            <button class="leftButton justify align"><i class="fa-solid fa-chevron-left"></i></button>
        </div>
        <div class="scroll-button right-btn flex">
            <button class="rightButton justify align"><i class="fa-solid fa-chevron-right"></i></button>
        </div>

        <div class="card-section random-tracks flex"></div>
    `;

    const cardSection = sectionDiv.querySelector(".card-section");

    tracks.forEach(track => {
        const trackName = track.name;
        const trackURL = track.external_urls.spotify;
        const artistName = track.artists.map(artist => artist.name).join(", ");
        const imageUrl = track.album.images[0]?.url || "";

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "flex");
        cardDiv.innerHTML = `
            <div class="img">
                <a href="${trackURL}" target="_blank">
                    <img src="${imageUrl}" alt="${trackName}">
                </a>
                <button class="without-hover play-button">
                    <a href="${trackURL}" target="_blank">
                        <i class="fa-solid fa-circle-play" style="color: #19e68c;"></i>
                    </a>
                </button>
            </div>
            <div class="title"><a href="${trackURL}" target="_blank">${trackName}</a></div>
            <div class="singer">${artistName}</div>
        `;

        cardSection.appendChild(cardDiv);
    });

    const rightContainer = document.querySelector(".right");
    rightContainer.appendChild(sectionDiv);

    cardHover("card");
    initializeScrollButtons(cardSection);
    addEvent(sectionDiv);
}

