const hour = document.querySelector(".hand.hour");
const minute = document.querySelector(".hand.minute");
const second = document.querySelector(".hand.second");

const digitalClock = document.querySelector(".digital-clock");
const date = document.querySelector(".date");

function fetchCurrentTime() {
    const nowTimeAndDate = new Date();

    const formattedHour = nowTimeAndDate.getHours().toString().padStart(2, "0");
    const formattedMinute = nowTimeAndDate.getMinutes().toString().padStart(2, "0");
    const formattedSecond = nowTimeAndDate.getSeconds().toString().padStart(2, "0");    

    const currentDate = nowTimeAndDate.toDateString();

    displayTimeAndDate(formattedHour, formattedMinute, formattedSecond, currentDate);
}
fetchCurrentTime();

function displayTimeAndDate(presentHours, presentMinutes, presentSeconds, currentDate) {
    const calculatePresentHoursInMinutes = Number((presentHours * 60)) + Number(presentMinutes);
    const calculatePresentMinutesInSeconds = Number((presentMinutes * 60)) + Number(presentSeconds);

    hour.style.transform = `translateX(-50%) rotate(${calculatePresentHoursInMinutes * 0.5}deg)`;
    minute.style.transform = `translateX(-50%) rotate(${calculatePresentMinutesInSeconds * 0.1}deg)`;
    second.style.transform = `translateX(-50%) rotate(${presentSeconds * 6}deg)`;

    digitalClock.textContent = `${presentHours}:${presentMinutes}:${presentSeconds}`;
    date.textContent = currentDate;
}

setInterval(fetchCurrentTime, 1000);
