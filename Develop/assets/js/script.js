// global variables for moment declarations
const dateField = $('#currentDay');
const container = $('.container-fluid');
container.append('<p id="localStorage">');

// displaying date at the top of the page
dateField.text(moment().format("[Today is] dddd, MMMM Do, YYYY."));

// list of usual business hours
const times = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM"
];

// function to handle saving items
const submitHandler = (event) => {
    // getting an ID for each row
    let id = event.target.id.substring(4, 5);

    // adding the text to local storage using the row ID
    let storedItem = $(`#description-${id}`).val();
    // check if there's anything to save
    if (storedItem.length == 0) {
        $('#localStorage').text("Nothing to save!");
    } else {
        localStorage.setItem(`${id}-text`, JSON.stringify(storedItem));
        $('#localStorage').text("Successfully saved item!");
    }
}

// startup function to get items from local storage and set them on the page
const init = () => {
    for (i = 0; i < times.length; i++) {
        $(`#description-${i}`).val(JSON.parse(localStorage.getItem(`${i}-text`)));
    }
}

// looping over all hours
for (let i = 0; i < times.length; i++) {
    // appending one row for each hour
    container.append(`<div class="row time-block" id=${times[i]}>`);
    // checking the time and appending the same objects with relevant classes
    if (moment().format("h") === times[i].substring(0, 1) || moment().format("h") === times[i].substring(0, 2)) {
        // appending the hour block
        $(`#${times[i]}`).append(`<div class="col present hour" id="time-block-${times[i]}">`);
        // adding the hour as text
        $(`#time-block-${times[i]}`).text(times[i]);
        // appending the text input block
        $(`#${times[i]}`).append(`<input class="col-10 present description" id="description-${i}">`);
    } else if (moment().subtract(i + 9, 'hours').format("dddd") === moment().format("dddd")) {
        // appending the hour block
        $(`#${times[i]}`).append(`<div class="col past hour" id="time-block-${times[i]}">`);
        // adding the hour as text
        $(`#time-block-${times[i]}`).text(times[i]);
        // appending the text input block
        $(`#${times[i]}`).append(`<input class="col-10 past description" id="description-${i}">`);
    } else if (moment().subtract(i + 9, 'hours').format("dddd") !== moment().format("dddd")) {
        // appending the hour block
        $(`#${times[i]}`).append(`<div class="col future hour" id="time-block-${times[i]}">`);
        // adding the hour as text
        $(`#time-block-${times[i]}`).text(times[i]);
        // appending the text input block
        $(`#${times[i]}`).append(`<input class="col-10 future description" id="description-${i}">`);
    }
    // appending the save button column
    $(`#${times[i]}`).append(`<button class="btn col saveBtn" id="btn-${i}">`);
    // adding the save icon
    $(`#btn-${i}`).append(`<i class="bi bi-save" id="btn-${i}">`);
    // adding event handler to save to local storage on clicking save
    $(`#btn-${i}`).on('click', submitHandler);
}

init();
