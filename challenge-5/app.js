const images = [
    {
        url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Beautiful Mountain Landscape",
    },
    {
        url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Ocean Sunset View",
    },
    {
        url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Autumn Forest Path",
    },
    {
        url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Urban City Skyline",
    },
];

const carouselTrack = document.getElementById("carouselTrack");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const caption = document.getElementById("caption");
const carouselNav = document.getElementById("carouselNav");
const autoPlayButton = document.getElementById("autoPlayButton");
const timerDisplay = document.getElementById("timerDisplay");

images.forEach((image) => {
    const createImage = document.createElement("img");
    const setImageAttributes = {
        src: image.url,
        class: "carousel-slide",
        alt: image.caption,
        width: "100%",
        height: "100%",
    };

    for (const attribute in setImageAttributes) {
        createImage.setAttribute(attribute, setImageAttributes[attribute]);
    }

    carouselTrack.appendChild(createImage);
});

const captionFind = images.map((image) => image.caption);
let trackNumberOfClickOnButtons = 0;

function dynamicSlide(currentPosition = 0) {
    carouselTrack.style.transform = `translateX(${-currentPosition}00%)`;
}

function dynamicallyChangeCaption(currentPosition = 0) {
    caption.innerText = captionFind[currentPosition];
}
dynamicallyChangeCaption();

function dynamicIndicator(currentPosition = 0) {
    const allCarouselIndicator = carouselNav.children;
    for (const element of allCarouselIndicator) {
        element.classList.remove("active");
    }
    allCarouselIndicator[currentPosition].classList.add("active");
}

prevButton.addEventListener("click", () => {
    trackNumberOfClickOnButtons--;
    dynamicSlide(trackNumberOfClickOnButtons);

    if (trackNumberOfClickOnButtons < 0) {
        trackNumberOfClickOnButtons = carouselTrack.children.length - 1;
        carouselTrack.style.transform = `translateX(${-trackNumberOfClickOnButtons}00%)`;
    }

    dynamicallyChangeCaption(trackNumberOfClickOnButtons);
    dynamicIndicator(trackNumberOfClickOnButtons);
});

nextButton.addEventListener("click", () => {
    trackNumberOfClickOnButtons++;
    dynamicSlide(trackNumberOfClickOnButtons);

    if (trackNumberOfClickOnButtons >= carouselTrack.children.length) {
        trackNumberOfClickOnButtons = 0;
        carouselTrack.style.transform = `translateX(${trackNumberOfClickOnButtons})`;
    }

    dynamicallyChangeCaption(trackNumberOfClickOnButtons);
    dynamicIndicator(trackNumberOfClickOnButtons);
});

images.forEach((image) => {
    const createCarouselIndicator = document.createElement("span");
    createCarouselIndicator.className = "carousel-indicator";

    carouselNav.appendChild(createCarouselIndicator);
});

dynamicIndicator(0);

carouselNav.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") {
        const convertNodeListToArray = [...carouselNav.children];
        const findCurrentClickIndicator = convertNodeListToArray.indexOf(
            event.target
        );

        trackNumberOfClickOnButtons = findCurrentClickIndicator;
        dynamicSlide(trackNumberOfClickOnButtons);
        dynamicallyChangeCaption(trackNumberOfClickOnButtons);
        dynamicIndicator(trackNumberOfClickOnButtons);
    }
});

let autoStartFlag = false;
let setAutoPlay;
let clearCalculatedTimeIds = [];

function calculateAutoTime() {
    for (let calculateTime = 5; calculateTime > 0; calculateTime--) {
        let clearCalculatedTimeId = setTimeout(() => {
            timerDisplay.innerText = `Next slide in ${calculateTime}s`;
        }, (5 - calculateTime) * 1000);

        clearCalculatedTimeIds.push(clearCalculatedTimeId);
    }
}

function clearAllTimeout() {
    clearCalculatedTimeIds.forEach((id) => clearTimeout(id));
    clearCalculatedTimeIds = [];
}

autoPlayButton.addEventListener("click", () => {
    autoStartFlag = !autoStartFlag;

    if (autoStartFlag) {
        setAutoPlay = setInterval(() => {
            nextButton.click();
            calculateAutoTime();
        }, 5000);

        calculateAutoTime();
        autoPlayButton.innerText = "Stop Auto Play";
    } else {
        autoPlayButton.innerText = "Start Auto Play";
        clearInterval(setAutoPlay);
        clearAllTimeout();
        timerDisplay.innerText = "Auto play stopped";
    }
});
