const clientId = "81e3d5d657f441ffaeb40bb87e0f7d3c";  // Replace with your actual Client ID
const clientSecret = "926e0d4e58254205a0d27f94a0e2df64";  // Keep this secret!

async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
}

async function fetchData(url) {
    try {
        const token = await getAccessToken();
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}


const home = document.querySelector("#home-logo");
home.addEventListener("click",()=>{
    const rightContainer = document.querySelector(".right");
    rightContainer.innerHTML="";
    
    addHeader(rightContainer);
    fetchPopularAlbums();
    fetchPopularArtists();
})