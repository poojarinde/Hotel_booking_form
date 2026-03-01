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

/* restrict past dates */
const today = new Date().toISOString().split("T")[0];
checkin.min = today;
checkout.min = today;

/* dynamic checkout min date */
checkin.addEventListener("change", () => {
    checkout.value = "";
    checkout.min = checkin.value;
    validateForm();
});

/* live validations */
checkout.addEventListener("change", validateForm);
roomType.addEventListener("change", () => {
    showRoomHint();
    validateForm();
});
guests.addEventListener("input", validateForm);

/* character counter */
requests.addEventListener("input", () => {
    charCount.textContent = requests.value.length + " / 200";
});

/* submit */
form.addEventListener("submit", function (e) {
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
    submitBtn.disabled = true;
    roomHint.textContent = "";
});

/* ---------- functions ---------- */

function validateForm() {

    clearErrors();
    let valid = true;

    if (!checkin.value) {
        checkinError.textContent = "Check-in date is required.";
        valid = false;
    }

    if (!checkout.value) {
        checkoutError.textContent = "Check-out date is required.";
        valid = false;
    }

    if (checkin.value && checkout.value && checkout.value <= checkin.value) {
        checkoutError.textContent = "Check-out must be after check-in.";
        valid = false;
    }

    if (!roomType.value) {
        roomError.textContent = "Room type is required.";
        valid = false;
    }

    if (!guests.value || guests.value < 1) {
        guestError.textContent = "Enter a valid guest count.";
        valid = false;
    }

    submitBtn.disabled = !valid;
    return valid;
}

function showRoomHint() {

    roomHint.textContent = "";

    if (roomType.value === "Single") {
        roomHint.textContent = "Best for one guest.";
    } else if (roomType.value === "Double") {
        roomHint.textContent = "Suitable for two guests.";
    } else if (roomType.value === "Suite") {
        roomHint.textContent = "Large room with premium facilities.";
    }
}

function clearErrors() {
    checkinError.textContent = "";
    checkoutError.textContent = "";
    roomError.textContent = "";
    guestError.textContent = "";
}