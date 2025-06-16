const mainHeading = document.getElementById("mainHeading");

function findTargetButtonElement(event) {
    switch (event.target.id) {
        case "redButton":
            mainHeading.style.color = "#e74c3c"
            break;
        case "greenButton":
            mainHeading.style.color = "#2ecc71"
            break;
        case "blueButton":
            mainHeading.style.color = "#3498db"
            break;
        case "purpleButton":
            mainHeading.style.color = "#9b59b6"
            break;
        case "resetButton":
            mainHeading.style.color = ""
            break;
    
        default:
            console.warn("No matching color for:", event.target.id);
            break;
    }
}
