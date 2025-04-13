const leftButton = document.querySelector(".left #expand-left");

leftButton.addEventListener("click", () => {
    const leftContainer = document.querySelector(".left");
    const rightConatiner = document.querySelector(".right");
    const image = leftButton.querySelector("img");

    if (image.src.includes("left_header_arrow_logo.svg")) {
        leftContainer.style.width = "50vw";
        rightConatiner.style.width = "49vw";
        image.src = "IMG/left_header_right_arrow_logo.svg";
    } else {
        leftContainer.style.width = "344px";
        rightConatiner.style.width = "100%";
        image.src = "IMG/left_header_arrow_logo.svg";
    }
});
