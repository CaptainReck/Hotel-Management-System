//carousel-start

const track= document.querySelector(".carousel-track")
const slides= Array.from(track.children)
const next_btn= document.querySelector(".next"); 
const prev_btn= document.querySelector(".prev"); 

const dots_nav= document.querySelector(".carousel-nav")
const dots= Array.from(dots_nav.children)

const slide_width= slides[0].getBoundingClientRect().width;

// arranging the slides
const setSlidePos=(slide,index) => {
    slide.style.left= slide_width * index +"px";
}
slides.forEach(setSlidePos)


const moveToSlide = (track, currentSlide, targetSlide) =>{
    track.style.transform='translateX(-' + targetSlide.style.left + ')'
    currentSlide.classList.remove('currentSlide')
    targetSlide.classList.add('currentSlide')
}

const updateDots=(currentDot,targetDot)=>{
    currentDot.classList.remove('currentSlide')
    targetDot.classList.add('currentSlide')
}

const hideShowArrow= (slides,prev_btn,next_btn,targetIndex) =>{
    if (targetIndex === 0){
        prev_btn.classList.add('is-hidden')
        next_btn.classList.remove('is-hidden')
    }
    else if(targetIndex === slides.length-1){
        prev_btn.classList.remove('is-hidden')
        next_btn.classList.add('is-hidden')
    }
    else{
        prev_btn.classList.remove('is-hidden')
        next_btn.classList.remove('is-hidden')
    }
}


next_btn.addEventListener("click", e => {
    const currentSlide= track.querySelector(".currentSlide");
    const nextSlide= currentSlide.nextElementSibling;

    const currentDot= dots_nav.querySelector('.currentSlide')
    nextDot=currentDot.nextElementSibling;

    const nextIndex=slides.findIndex(slide => slide===nextSlide)

    moveToSlide(track,currentSlide,nextSlide);
    updateDots(currentDot,nextDot); 
    hideShowArrow(slides,prev_btn,next_btn,nextIndex);
})


prev_btn.addEventListener("click", e => {
    const currentSlide= track.querySelector(".currentSlide");
    const prevSlide= currentSlide.previousElementSibling;

    const currentDot= dots_nav.querySelector('.currentSlide')
    prevDot=currentDot.previousElementSibling;

    const prevIndex=slides.findIndex(slide => slide===prevSlide)
    

    moveToSlide(track,currentSlide,prevSlide)
    updateDots(currentDot,prevDot);
    hideShowArrow(slides,prev_btn,next_btn,prevIndex); 
})


// dots nav
dots_nav.addEventListener('click',e =>{
    const targetDot=e.target.closest('button');
    if(!targetDot) return;

    const currentSlide=track.querySelector('.currentSlide');
    const currentDot=dots_nav.querySelector('.currentSlide');
    const targetIndex= dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track,currentSlide,targetSlide)
    updateDots(currentDot,targetDot)
    hideShowArrow(slides,prev_btn,next_btn,targetIndex)
})
//carousel-end

//Chat gpt's----navlinks scrolling

const scrollLinks = document.querySelectorAll(".nav-links");

scrollLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const targetId = this.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const targetOffset = targetSection.getBoundingClientRect().top;
            const startPosition = window.pageYOffset;
            const duration = 1000; // Adjust the duration (in milliseconds) as needed
            let startTime;

            function scrollAnimation(currentTime) {
                if (!startTime) startTime = currentTime;
                const progress = currentTime - startTime;
                const scrollY = easeInOutQuad(progress, startPosition, targetOffset, duration);
                window.scrollTo(0, scrollY);

                if (progress < duration) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return (c / 2) * t * t + b;
                t--;
                return (-c / 2) * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(scrollAnimation);
        }
    });
});

//navlinks-end

//rooms-section
// JavaScript to handle room selection
const selectButtons = document.querySelectorAll(".room-btn");
let selectedRoom = null;

selectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const roomType = this.getAttribute("data-room");
        const parent = this.parentNode
        const pref = parent.querySelector(".preferences")
        const addon = parent.querySelector(".add-ons")

        // Check if the button is already selected
        const isAlreadySelected = this.classList.contains("selected-button");

        // Deselect the button if it's already selected
        if (isAlreadySelected) {
            this.classList.remove("selected-button");
            selectedRoom = null;
            pref.classList.add("hidden_room")
            addon.classList.add("hidden_room")
        } else {
            // Deselect any previously selected button
            const previouslySelectedButton = document.querySelector(".room-btn.selected-button");
            if (previouslySelectedButton) {
                previouslySelectedButton.classList.remove("selected-button");

                prev_parent=previouslySelectedButton.parentNode
                prev_addon=prev_parent.querySelector(".add-ons")
                prev_pref=prev_parent.querySelector(".preferences")

                prev_pref.classList.add("hidden_room")
                prev_addon.classList.add("hidden_room")
            }

            // Select the clicked button
            this.classList.add("selected-button");
            selectedRoom = roomType;
            pref.classList.remove("hidden_room")
            addon.classList.remove("hidden_room")
        }
    });
});


// JavaScript for "Read More" button
const toggleButtons = document.querySelectorAll(".toggle-amenities-btn");

toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const amenitiesList = this.parentNode.querySelector(".amenities-list");
        if (amenitiesList) {
            const amenityItems = amenitiesList.querySelectorAll(".amenity-item");
            amenityItems.forEach(function (item, index) {
                if (index >= 5) {
                    item.classList.toggle("hidden");
                }
            });
            const buttonText = this.textContent;
            this.textContent = buttonText === "Read More" ? "Read Less" : "Read More";
        }
    });
});

// JavaScript function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const check_value=[]
    
    // Get user input from the form
    const customerName = document.getElementById("customerName").value;
    const numberOfPeople = document.getElementById("numberOfPeople").value;
    const customerPhoneNumber = document.getElementById("customerPhoneNumber").value;
    const customerEmail = document.getElementById("customerEmail").value;
    const CheckIn = document.getElementById("CheckIn").value;
    const CheckOut = document.getElementById("CheckOut").value;

    emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    
    // Check if a room is selected
    if (selectedRoom !== undefined && selectedRoom !== null) {

        const room = document.querySelector(".selected-button");
        const parentdiv = room.parentNode;
        const pref_dropdown = parentdiv.querySelector(".preferences select");
        const pref = pref_dropdown.value;

        const addon_check = parentdiv.querySelectorAll(".add-ons input[type='checkbox']")

        addon_check.forEach(function(checkbox){
            check_value.push(checkbox.checked); 
        })

        const currentDate = new Date();

        // Get the current year (4 digits)
        const currentYear = currentDate.getFullYear();

        // Get the current month (0-11, where 0 is January) and add 1 to convert to 1-12 format
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');

        // Get the current day of the month (1-31)
        const currentDay = currentDate.getDate().toString().padStart(2, '0');

        // Create a formatted date string in "yyyy-mm-dd" format
        const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

        // Check if the CheckIn and CheckOut dates are valid dates
        const checkInDate = new Date(CheckIn);
        const checkOutDate = new Date(CheckOut);

        if (!isNaN(checkInDate) && !isNaN(checkOutDate)) {
            // Check if the CheckOut date is later than CheckIn date
            if (checkOutDate > checkInDate && checkInDate >= currentDate) {
                // Check phone number and email validity
                if (customerPhoneNumber.length === 10) {
                    if (emailPattern.test(customerEmail)) {
                        const userData = {
                            "Name": customerName,
                            "Email": customerEmail,
                            "Phone Number": customerPhoneNumber,
                            "Number of People": numberOfPeople,
                            "Room Type": selectedRoom,
                            "CheckIn": CheckIn,
                            "CheckOut": CheckOut,
                            "Preferences":pref,
                            "Add-ons":check_value
                        };
                        const userDataJSON = JSON.stringify(userData);
                        console.log(userDataJSON);

                        // Display the JSON data (you can replace this with your preferred method)
                        const requestOptions = {
                            method: "POST",
                            headers: {
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(userData)
                        };
                        
                        const serverURL = "http://127.0.0.1:5000/protected-page";
                        
                        fetch(serverURL, requestOptions)
                        .then(response => {
                            if (response.status !== 200) {
                            throw new Error(`Login failed. Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            room_status=document.getElementById("RoomStatus")
                            if (data.message==="Room Booked"){
                                room_status.innerHTML = `Booking successfull! Your Room Number is ${data["Room No"]}`;
                            }
                            else{
                                room_status.innerHTML = data.message;    
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error.message);
                        });
                
                        // Convert the JSON object to a JSON string for easy transmission or storage

                    } else {
                        alert("Invalid email id");
                    }
                } else {
                    alert("Invalid phone number");
                }
            } else {
                alert("Checkout date must be later than Check-in date.");
            }
        } else {
            alert("Invalid date format. Please use yyyy-mm-dd format.");
        }
    }
    else {
        // Handle the case where no room is selected
        alert("Please select a room before submitting.");
    }
}


// Add an event listener to the input element
document.getElementById("customerPhoneNumber").addEventListener("input", function() {
    let phoneNumber = this.value.trim(); // Remove leading/trailing spaces

    // Remove any non-numeric characters
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    // Remove any leading '1's and limit to 10 digits
    phoneNumber = phoneNumber.replace(/^1+/, '').slice(0, 10);

    // Update the input value
    this.value = phoneNumber;
});

// Add an event listener to the "Number of Guests" input field
document.getElementById("numberOfPeople").addEventListener("input", function() {
    let numberOfPeople = parseInt(this.value);

    // Check if the input is less than 1, set it to 1
    if (numberOfPeople < 1 || isNaN(numberOfPeople)) {
        numberOfPeople = 1;
    }
    
    // Check if the input is greater than 4, set it to 4
    if (numberOfPeople > 4) {
        numberOfPeople = 4;
    }

    // Update the input value
    this.value = numberOfPeople;
});

// Add an event listener to handle backspacing
document.getElementById("numberOfPeople").addEventListener("keydown", function(event) {
    if (event.key === "Backspace" && parseInt(this.value) > 4) {
        // Prevent the default behavior of the Backspace key
        event.preventDefault();

        // Remove the last digit, effectively allowing backspacing
        this.value = null;
    }
});




  