function cardHover(query){

        document.querySelectorAll(`.${query}`).forEach(card => {
            const button = card.querySelector("button");
    
            card.addEventListener("mouseenter", () => {
                button.classList.remove("without-hover"); // Remove existing class
                button.classList.add("with-hover"); // Add new class
            });
    
            card.addEventListener("mouseleave", () => {
                button.classList.remove("with-hover"); // Remove new class
                button.classList.add("without-hover"); // Restore original class
            });
        });
}