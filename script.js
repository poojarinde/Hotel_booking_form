const form = document.getElementById("bookingForm");

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const roomType = document.getElementById("roomType");
const guests = document.getElementById("guests");

const checkinError = document.getElementById("checkinError");
const checkoutError = document.getElementById("checkoutError");
const roomError = document.getElementById("roomError");
const guestError = document.getElementById("guestError");

const today = new Date().toISOString().split("T")[0];
checkin.min = today;
checkout.min = today;

/* Update checkout minimum date based on check-in */
checkin.addEventListener("change", function () {
    checkout.value = "";
    checkout.min = checkin.value;
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

    if (checkin.value && checkout.value) {
        if (checkout.value <= checkin.value) {
            showError(checkoutError, "Check-out date must be after check-in date.");
            isValid = false;
        }
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
            checkInDate: checkin.value,
            checkOutDate: checkout.value,
            roomType: roomType.value,
            guests: guests.value,
            specialRequests: document.getElementById("requests").value
        };

        console.log(bookingData);
        form.reset();
    }
});

function showError(element, message) {
    element.textContent = message;
}

function clearErrors() {
    checkinError.textContent = "";
    checkoutError.textContent = "";
    roomError.textContent = "";
    guestError.textContent = "";
}