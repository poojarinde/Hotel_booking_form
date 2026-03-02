const form = document.getElementById("bookingForm");

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const roomType = document.getElementById("roomType");
const guests = document.getElementById("guests");
const requests = document.getElementById("requests");
const submitBtn = document.getElementById("submitBtn");

const checkinError = document.getElementById("checkinError");
const checkoutError = document.getElementById("checkoutError");
const roomError = document.getElementById("roomError");
const guestError = document.getElementById("guestError");

const roomHint = document.getElementById("roomHint");
const charCount = document.getElementById("charCount");

/* date restriction */
const today = new Date().toISOString().split("T")[0];
checkin.min = today;
checkout.min = today;

/* listeners */
checkin.addEventListener("change", () => {
    checkout.value = "";
    checkout.min = checkin.value;
    validateForm();
});

checkout.addEventListener("change", validateForm);
roomType.addEventListener("change", () => {
    showRoomHint();
    validateForm();
});
guests.addEventListener("input", validateForm);

requests.addEventListener("input", () => {
    charCount.textContent = requests.value.length + " / 200";
});

/* submit */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const bookingData = {
        checkIn: checkin.value,
        checkOut: checkout.value,
        roomType: roomType.value,
        guests: guests.value,
        requests: requests.value
    };

    console.log(bookingData);

    form.reset();
    charCount.textContent = "0 / 200";
    roomHint.textContent = "";
    submitBtn.disabled = true;
    clearFieldStyles();
});

/* ------------------ */

function validateForm() {

    clearErrors();
    clearFieldStyles();

    let valid = true;

    if (!checkin.value) {
        setError(checkin, checkinError, "Check-in date is required.");
        valid = false;
    }

    if (!checkout.value) {
        setError(checkout, checkoutError, "Check-out date is required.");
        valid = false;
    }

    if (checkin.value && checkout.value && checkout.value <= checkin.value) {
        setError(checkout, checkoutError, "Check-out must be after check-in.");
        valid = false;
    }

    if (!roomType.value) {
        setError(roomType, roomError, "Room type is required.");
        valid = false;
    }

    if (!guests.value || guests.value < 1) {
        setError(guests, guestError, "Enter a valid guest count.");
        valid = false;
    }

    submitBtn.disabled = !valid;
    return valid;
}

function setError(field, errorElement, message) {
    field.classList.add("invalid");
    errorElement.textContent = message;
}

function clearErrors() {
    checkinError.textContent = "";
    checkoutError.textContent = "";
    roomError.textContent = "";
    guestError.textContent = "";
}

function clearFieldStyles() {
    [checkin, checkout, roomType, guests, requests].forEach(el => {
        el.classList.remove("invalid");
    });
}

function showRoomHint() {

    roomHint.textContent = "";

    if (roomType.value === "Single") {
        roomHint.textContent = "Best for one guest.";
    } 
    else if (roomType.value === "Double") {
        roomHint.textContent = "Suitable for two guests.";
    } 
    else if (roomType.value === "Suite") {
        roomHint.textContent = "Large room with premium facilities.";
    }
}