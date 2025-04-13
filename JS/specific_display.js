const rightContainer = document.querySelector(".right");

function addEvent(sectionDiv){

    const heading = sectionDiv.querySelector("h2");

    heading.addEventListener("click",()=>{
        rightContainer.innerHTML = "";
        rightContainer.append(sectionDiv);

        const h5 = sectionDiv.querySelector("h5");
        const leftButton = sectionDiv.querySelector(".left-btn");
        const rightButton = sectionDiv.querySelector(".right-btn");
        h5.remove();
        leftButton.remove();
        rightButton.remove();

        const cardSection = sectionDiv.querySelector(".card-section");
        // cardSection.classList.remove("flex");
        cardSection.classList.add("grid");
    })
}