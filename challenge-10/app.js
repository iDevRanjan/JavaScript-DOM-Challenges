const gameContainer = document.getElementById("gameContainer");
const moves = document.getElementById("moves");
const time = document.getElementById("time");

const gameItems = ["🍆", "💦", "🍑", "🤤", "🫦", "🍌", "🔞", "😋"];
const createNewGameItem = [...gameItems, ...gameItems];
let randomPositionForGameItems = [];
let storeClickedElement = [];
let numberOfGameItemMatch = 0;

let numberOfMoves = 0;

let setMinute = 0;
let setSecond = 0;
let collectSetIntervalId = null;

// Create card elements
function createCard(gameItem) {
    const createCardElement = document.createElement("button");
    createCardElement.className = "card";

    const createCardFront = document.createElement("div");
    createCardFront.className = "card-front";

    const createCardBack = document.createElement("div");
    createCardBack.className = "card-back";
    createCardBack.innerText = gameItem;

    createCardElement.append(createCardFront, createCardBack);

    gameContainer.appendChild(createCardElement);

    // Add flipped class on card and game functionality
    createCardElement.addEventListener("click", () => {
        createCardElement.classList.add("flipped");
        storeClickedElement.push(createCardElement);

        const isSameItemClick =
            storeClickedElement[0] === storeClickedElement[1];

        if (storeClickedElement.length === 2) {
            if (!isSameItemClick) {
                numberOfMoves++;

                const isClickedGameItemsMatched =
                    storeClickedElement[0].innerText ===
                    storeClickedElement[1].innerText;

                if (!isClickedGameItemsMatched) {
                    storeClickedElement.forEach((element) => {
                        setTimeout(() => {
                            element.classList.remove("flipped");
                        }, 500);
                    });
                    storeClickedElement.length = 0;
                } else {
                    storeClickedElement.forEach((element) => {
                        setTimeout(() => {
                            element.disabled = true;
                        }, 10);
                    });
                    storeClickedElement.length = 0;
                    numberOfGameItemMatch++;

                    if (numberOfGameItemMatch === gameItems.length) {
                        clearInterval(collectSetIntervalId);
                        setTimeout(() => {
                            alert("Congratulations buddy you won the game");
                        }, 500);
                    }
                }

                moves.innerText = numberOfMoves;
            } else {
                storeClickedElement.pop();
            }
        }
    });
}

// Game items random position
function randomPositonGameItem() {
    const randomIndex = Math.floor(Math.random() * createNewGameItem.length);
    const randomItem = createNewGameItem[randomIndex];
    const isRandomItemExistOrNot =
        randomPositionForGameItems.includes(randomItem);

    if (isRandomItemExistOrNot) {
        const checkNumbersOfTimes = randomPositionForGameItems.filter(
            (item) => {
                return item === randomItem;
            }
        ).length;

        if (checkNumbersOfTimes < 2) {
            randomPositionForGameItems.push(randomItem);

            if (
                !(
                    randomPositionForGameItems.length ===
                    createNewGameItem.length
                )
            ) {
                randomPositonGameItem();
            }
        } else {
            randomPositonGameItem();
        }
    }

    if (!isRandomItemExistOrNot) {
        randomPositionForGameItems.push(randomItem);
        randomPositonGameItem();
    }
}
randomPositonGameItem();

// Display cards
randomPositionForGameItems.forEach((gameItem) => {
    createCard(gameItem);
});

// Count times
function timeCount() {
    collectSetIntervalId = setInterval(() => {
        setSecond++;

        if (setSecond >= 60) {
            setSecond = 0;
            setMinute++;
        }

        const formattedMinute = setMinute.toString().padStart(2, "0");
        const formattedSecond = setSecond.toString().padStart(2, "0");

        time.innerText = `${formattedMinute}:${formattedSecond}`;
    }, 1000);
}

gameContainer.addEventListener(
    "click",
    (event) => {
        const captureCardButton = event.target.closest(".card");

        if (captureCardButton) {
            timeCount();
        }
    },
    {
        once: true,
    }
);

// Restart game function
function restartGame(params) {
    window.location.reload();
}
