const form = document.getElementById("bookingForm");

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const roomType = document.getElementById("roomType");
const guests = document.getElementById("guests");

const checkinError = document.getElementById("checkinError");
const checkoutError = document.getElementById("checkoutError");
const roomError = document.getElementById("roomError");
const guestError = document.getElementById("guestError");

const roomHint = document.getElementById("roomHint");

/* Disable past dates */
const today = new Date().toISOString().split("T")[0];
checkin.min = today;
checkout.min = today;

/* Dynamic checkout minimum date */
checkin.addEventListener("change", function () {
    checkout.value = "";
    checkout.min = checkin.value;
});

/* Dynamic room information (optional enhancement) */
roomType.addEventListener("change", function () {

    roomHint.textContent = "";

    if (roomType.value === "Single") {
        roomHint.textContent = "Single room is suitable for one person.";
    } 
    else if (roomType.value === "Double") {
        roomHint.textContent = "Double room is suitable for two guests.";
    } 
    else if (roomType.value === "Suite") {
        roomHint.textContent = "Suite offers extra space and premium facilities.";
    }
});

/* Form validation */
form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    if (!checkin.value) {
        showError(checkinError, "Please select a check-in date.");
        isValid = false;
    }

    if (!checkout.value) {
        showError(checkoutError, "Please select a check-out date.");
        isValid = false;
    }

    if (checkin.value && checkout.value && checkout.value <= checkin.value) {
        showError(checkoutError, "Check-out date must be after check-in date.");
        isValid = false;
    }

    if (!roomType.value) {
        showError(roomError, "Please select a room type.");
        isValid = false;
    }

    if (!guests.value || guests.value < 1) {
        showError(guestError, "Please enter a valid guest count.");
        isValid = false;
    }

    if (isValid) {

        const bookingData = {
            checkIn: checkin.value,
            checkOut: checkout.value,
            roomType: roomType.value,
            guests: guests.value,
            requests: document.getElementById("requests").value
        };

        console.log(bookingData);
        form.reset();
        roomHint.textContent = "";
    }
});

function showError(el, msg) {
    el.textContent = msg;
}

function clearErrors() {
    checkinError.textContent = "";
    checkoutError.textContent = "";
    roomError.textContent = "";
    guestError.textContent = "";
}