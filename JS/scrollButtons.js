function initializeScrollButtons(section) {
    // const sections = document.querySelectorAll(".card-section");
    // console.log("Sections found:", sections.length);
    // console.log(sections);

    if (section.length === 0) {
        console.warn("No .card-section elements found! Ensure they are loaded.");
        return;
    }

    // sections.forEach(section => {
        const container = section;
        const leftButton = section.parentElement.querySelector(".left-btn button");
        const rightButton = section.parentElement.querySelector(".right-btn button");

        if (!leftButton || !rightButton) {
            console.warn("Scroll buttons not found for a section.");
            return;
        }

        const scrollAmount = 500;

        leftButton.addEventListener("click", () => {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        rightButton.addEventListener("click", () => {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        function updateButtonVisibility() {
            leftButton.style.display = container.scrollLeft > 0 ? "flex" : "none";
            rightButton.style.display =
                container.scrollLeft + container.clientWidth < container.scrollWidth ? "flex" : "none";
        }

        container.addEventListener("scroll", updateButtonVisibility);
        updateButtonVisibility();
    // });
}
