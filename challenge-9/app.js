const toggleBtn = document.querySelector(".toggle-btn");
const panel = document.querySelector(".panel");
const menuItem = panel.querySelectorAll(".menu-item");
const closeBtn = panel.querySelector(".close-btn");

toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("active");

    const findActiveClass = document.querySelector(".active");
    const isPanelActive = panel.contains(findActiveClass);

    if (isPanelActive) {
        menuItem.forEach((element) => {
            element.addEventListener("click", () => {
                alert(`Your are in ${element.innerText.toLowerCase()} page`);
            });
        });
    }
});

closeBtn.addEventListener("click", () => {
    panel.classList.remove("active");
});
