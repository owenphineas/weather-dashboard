let currentCity = document.querySelector("#currentCity");
let thisCity = "Atlanta";

function setDates() {
    currentCity.textContent = thisCity + " (" + dayjs().format("M/D/YYYY") + ")";
    for(i = 0; i < 5; i++) {
        document.querySelector("#day" + [i + 1]).textContent = dayjs().add([i + 1], "day").format("M/D/YYYY");
    }
}

setDates();