const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
const ageInput = document.getElementById("ageInput");
const bioInput = document.getElementById("bioInput");

const nameDisplay = document.getElementById("nameDisplay");
const jobDisplay = document.getElementById("jobDisplay");
const ageDisplay = document.getElementById("ageDisplay");
const bioDisplay = document.getElementById("bioDisplay");

nameInput.addEventListener("input", () => {
    nameDisplay.innerText = nameInput.value;
});

jobInput.addEventListener("input", () => {
    jobDisplay.innerText = jobInput.value;
});

ageInput.addEventListener("input", () => {
    if (Number(ageInput.value) > 120) {
        alert("Please enter a valid age between 0 and 120.");
        return;
    }
    ageDisplay.innerText = ageInput.value;
});

bioInput.addEventListener("input", () => {
    bioDisplay.innerText = bioInput.value;
});
