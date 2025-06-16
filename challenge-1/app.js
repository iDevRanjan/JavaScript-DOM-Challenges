const bodyElem = document.getElementById("body");
const bulbElem = document.getElementById("bulb");
const toggleButton = document.getElementById("toggleButton");
const statusCheck = document.getElementById("status");

toggleButton.addEventListener("click", () => {
    bodyElem.classList.toggle("dark-mode");
    const isOff = bulbElem.classList.toggle("off");

    toggleButton.innerText = isOff ? "Turn On" : "Turn Off";
    statusCheck.innerText = isOff ? "Status: Off" : "Status: On";
});
