async function fetchPopularAlbums() {
    const url = "https://api.spotify.com/v1/browse/new-releases?country=IN&limit=10";
    const data = await fetchData(url); // fetchData must include authorization headers

    if (!data || !data.albums) {
        console.log("⚠️ No Popular Albums found.");
        return;
    }

    if (!rightContainer) {
        console.error("⚠️ Container '.right' not found!");
        return;
    }

    displayAlbums(data.albums.items);
    createTrackInfo(data.albums.items[0]);
}

function createTrackInfo(album){
    const trackInfo = {
        image: album.images[0]?.url || "",
        title: album.name,
        singer: album.artists.map(artist => artist.name).join(", "),
    };
    playbarSong(trackInfo);
}


function displayAlbums(albums) {
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("card-section-container");
    sectionDiv.innerHTML = `
        <div class="card-section-header flex">
            <h2><a href="#">Popular Albums</a></h2>
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

    albums.forEach((album) => {
        const albumImage = album.images[0]?.url || "";
        const albumName = album.name;
        const artists = album.artists.map(artist => artist.name).join(", ");

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "flex");
        cardDiv.innerHTML = `
            <div class="img">
                <img src="${albumImage}" alt="${albumName}">
                <button class="without-hover play-button">
                    <i class="fa-solid fa-circle-play" style="color: #19e68c;"></i>
                </button>
            </div>
            <div class="title"><a>${albumName}</a></div>
            <div class="singer"><a>${artists}</a></div>
        `;

        cardSection.appendChild(cardDiv);
    });

    rightContainer.appendChild(sectionDiv);
   
    cardHover("card");
    initializeScrollButtons(cardSection);
    addEvent(sectionDiv);
    addCardClickListeners(cardSection);
}

fetchPopularAlbums();








// async function fetchPopularAlbums() {
//     const url = "https://api.spotify.com/v1/browse/new-releases?country=IN&limit=10";
//     const data = await fetchData(url); // fetchData must include authorization headers

//     if (!data || !data.albums) {
//         console.log("⚠️ No Popular Albums found.");
//         return;
//     }

//     if (!rightContainer) {
//         console.error("⚠️ Container '.right' not found!");
//         return;
//     }

//     displayAlbums(data.albums.items);
// }

// // async function getPreviewUrl(albumId) {
// //     const url = `https://api.spotify.com/v1/albums/${albumId}`;
// //     const albumData = await fetchData(url);
// //     const previewUrl = albumData.tracks.items.find(track => track.preview_url)?.preview_url || null;
// //     return previewUrl;
// // }

// async function displayAlbums(albums) {
//     const sectionDiv = document.createElement("div");
//     sectionDiv.classList.add("card-section-container");
//     sectionDiv.innerHTML = `
//         <div class="card-section-header flex">
//             <h2><a href="#">Popular Albums</a></h2>
//             <h5><a href="#">Show All</a></h5>
//         </div>
//         <div class="scroll-button left-btn flex">
//             <button class="leftButton justify align"><i class="fa-solid fa-chevron-left"></i></button>
//         </div>
//         <div class="scroll-button right-btn flex">
//             <button class="rightButton justify align"><i class="fa-solid fa-chevron-right"></i></button>
//         </div>
//         <div class="card-section flex"></div>
//     `;

//     const cardSection = sectionDiv.querySelector(".card-section");

//     // Fetch preview URLs in parallel
//     // const previews = await Promise.all(albums.map(album => getPreviewUrl(album.id)));

//     albums.forEach((album, index) => {
//         const albumImage = album.images[0]?.url || "";
//         const albumName = album.name;
//         const artists = album.artists.map(artist => artist.name).join(", ");
//         // const previewUrl = previews[index];

//         const cardDiv = document.createElement("div");
//         cardDiv.classList.add("card", "flex");
//         cardDiv.innerHTML = `
//             <div class="img">
//                 <img src="${albumImage}" alt="${albumName}">
//                 <button class="without-hover play-button">
//                     <i class="fa-solid fa-circle-play" style="color: #19e68c;"></i>
//                 </button>
//             </div>
//             <div class="title"><a>${albumName}</a></div>
//             <div class="singer"><a>${artists}</a></div>
//         `;

//         cardSection.appendChild(cardDiv);
//     });

//     rightContainer.appendChild(sectionDiv);
//     cardHover("card");

//     addEvent(sectionDiv);
//     // setupAudioPlayback();
// }


// fetchPopularAlbums();


// // <button class="without-hover play-button" ${previewUrl ? `data-preview="${previewUrl}"` : "disabled"}>
// //                     <i class="fa-solid fa-circle-play" style="color: #19e68c;"></i>
// //                 </button>