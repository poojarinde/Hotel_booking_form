const form = document.getElementById("bookingForm")

form.addEventListener("submit", function(e){

const name = document.getElementById("name").value.trim()
const email = document.getElementById("email").value.trim()
const phone = document.getElementById("phone").value.trim()
const checkin = document.getElementById("checkin").value
const checkout = document.getElementById("checkout").value
const guests = document.getElementById("guests").value

/* Name Validation */

if(name.length < 3){
alert("Name must be at least 3 characters")
e.preventDefault()
return
}

/* Email Validation */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailPattern.test(email)){
alert("Enter a valid email address")
e.preventDefault()
return
}

/* Phone Validation */

if(phone.length < 10 || isNaN(phone)){
alert("Enter a valid 10 digit phone number")
e.preventDefault()
return
}

/* Guests Validation */

if(guests < 1){
alert("Guests must be at least 1")
e.preventDefault()
return
}

/* Date Validation */

if(checkout <= checkin){
alert("Check-out date must be after check-in date")
e.preventDefault()
return
}

/* Success Message */

alert("Booking submitted successfully!")

})
