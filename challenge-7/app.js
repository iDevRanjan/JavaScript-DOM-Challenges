const accordion = document.getElementById("accordion");
const accordionItem = document.getElementsByClassName("accordion-item");
const accordionButton = document.getElementsByClassName("accordion-button");

accordion.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        event.target.parentElement.classList.toggle("active");

        const addToggleActiveClass = document.getElementsByClassName("active");

        if (addToggleActiveClass.length > 1) {
            for (const element of accordionItem) {
                element.classList.remove("active");
            }

            event.target.parentElement.classList.add("active");
        }
    }
});
