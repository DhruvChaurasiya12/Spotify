const hamburger = document.querySelector("#hamburger button");
const leftContainer = document.querySelector(".left");

let isVisible = false;

hamburger.addEventListener("click", () => {
    if (!isVisible) {
        leftContainer.classList.remove("slide-out");
        leftContainer.classList.add("slide-in");
    } else {
        leftContainer.classList.remove("slide-in");
        leftContainer.classList.add("slide-out");
    }
    isVisible = !isVisible;
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        leftContainer.style.display = "";
    }
});


