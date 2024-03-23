const prices=[
    {eventname:"Weddings",price:100000,services:["Catering","Entertainment","Photography"],description:"Experience the epitome of elegance and romance with our comprehensive wedding planning services. At the heart of our approach is the desire to transform your dream wedding into a breathtaking reality. Our team of seasoned professionals is committed to curating an event that encapsulates your unique love story. From selecting the perfect venue to orchestrating exquisite floral arrangements, every detail is meticulously planned to reflect your personal style and vision. Our catering services offer an array of gourmet delights that tantalize the taste buds, ensuring a culinary experience that leaves a lasting impression. The entertainment is curated to keep the atmosphere lively and engaging, setting the stage for unforgettable memories. Our expert photographers capture every moment with precision and artistry, preserving the essence of your special day for years to come. With our personalized approach and attention to detail, we aim to make your wedding day a truly magical and memorable celebration of love."},
    {eventname:"Conferences",price:75000,services:["Catering","Photography"],description:"Elevate your professional gatherings with our expert conference planning services. We understand the importance of creating a productive and inspiring atmosphere for your attendees. Our dedicated team works closely with you to ensure seamless logistics, engaging presentations, and a flawless execution of your conference vision. We offer a variety of catering options to suit your needs, from energizing coffee breaks to gourmet luncheons. Our skilled photographers and videographers are on hand to capture key moments, providing you with high-quality images and footage for promotional and archival purposes. With our meticulous planning and attention to detail, you can trust us to bring your conference to life and leave a lasting impression on your participants. Whether you are hosting a small seminar or a large-scale corporate event, we are committed to delivering an exceptional conference experience that exceeds your expectations and enhances your professional reputation."},
    {eventname:"Parties",price:50000,services:["Entertainment","Catering"],description:"Let us ignite the excitement for your next party with our dynamic event planning services. Whether you're celebrating a milestone birthday, an anniversary, or just want to throw a memorable bash, we've got you covered. Our team specializes in crafting unforgettable experiences tailored to your specific desires and preferences. From selecting a vibrant theme to arranging captivating entertainment, we take care of every detail to ensure your party is a resounding success. Our catering services offer a delectable range of dishes that will delight your guests' palates and keep them coming back for more. We also provide a variety of entertainment options, from live music to interactive games, to keep the atmosphere lively and engaging throughout the event. With our meticulous planning, creative ideas, and personalized approach, we aim to make your party one to remember. Let us take the stress out of party planning so you can relax and enjoy a fun-filled celebration with your friends and family."}
];


let body=document.querySelector("#main");
let formcont=document.querySelector("#contact")
let form=document.querySelector("#info_form");
let req=document.querySelector(".reqform");
let exit=document.querySelector(".close");
let submitform=document.querySelector("input[type='submit']");
let eventDetails = document.querySelector(".event_details");
let eventTitle = document.getElementById("eventTitle");
let eventImage = document.getElementById("eventImage");
let eventDescription = document.getElementById("eventDescription");
let eventPrice = document.getElementById("eventPrice");
let eventServices = document.getElementById("eventServices");
let filtersearch=document.querySelector("#filters button");
let dispevents = document.querySelector('.dispevents');
let checkForm = document.querySelector('.check');
let radioForm = document.querySelector('.radio');
let eventDivs = document.querySelectorAll(".event_type");
//form pop-up
req.addEventListener('click',function(){
    formcont.style.display = "block";
    form.classList.remove("hide");
    body.style.opacity = 0.3;
});

document.querySelector("#contact .close").addEventListener("click", function() {
    formcont.style.display = "none";
    form.classList.add("hide");
    body.style.opacity = 1;
});


//displaying form data in a new window
submitform.addEventListener("click",function(e){
    e.preventDefault();
    const formData = new FormData(document.getElementById('info_form'));
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        eventChoice: formData.get('eventChoice'),
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.href = 'booking-details.html';
})


//form validation
function checkform(){
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let ph=document.getElementById("ph").value;
    let error=document.querySelector("#contact .error");
    if(!name.match(/^[a-zA-Z]+$/)){
        error.textContent="Please enter a valid name";
        return false;
    }
    if(!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)){
        error.textContent="Please enter a valid email Id";
        return false;
    }
    if(!(/^(0|91)?[7-9][0-9]{9}$/.test(ph))){
        error.textContent="Please enter a valid mobile number";
        return false;
    }

}

//enlarged event view

eventDivs.forEach(eventDiv => {
    eventDiv.addEventListener("click", function() {
        const eventName = this.id;
        const selectedEvent = prices.find(event => event.eventname === eventName);

        eventTitle.textContent = selectedEvent.eventname;
        eventImage.src = `./images/${selectedEvent.eventname}.jpg`;
        eventDescription.textContent = selectedEvent.description || "";
        eventPrice.textContent = `Price: Rs${selectedEvent.price}`;
        eventServices.textContent = `Services: ${selectedEvent.services.join(", ")}`;
        eventDetails.style.display = "block";
    });
});

document.querySelector(".event_details .close").addEventListener("click", function() {
    eventDetails.style.display = "none";
});


//filters

function filterEvents(){

    let checked= Array.from(checkForm.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    let radios=parseInt(radioForm.querySelector('input[type="radio"]:checked').value);
    console.log("Selected Services:", checked);
    console.log("Selected Price:", radios);
    const filteredEvents = prices.filter(event => {
        const hasSelectedServices = checked.every(service => event.services.includes(service));
        const isPriceInRange = event.price <= radios;
        return hasSelectedServices && isPriceInRange;
    });
    console.log("Filtered Events:", filteredEvents);
    displayEvents(filteredEvents);
}

function displayEvents(events){
    if(events.length === 0) {
        dispevents.innerHTML = "<p>No events found</p>";
        return;
    }
    dispevents.innerHTML = "";
    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event_display';
        eventDiv.innerHTML = `
            <img src="./images/${event.eventname}.jpg">
            <h2>${event.eventname}</h2>
            <p>Price: ${event.price}</p>
            <p>Services: ${event.services.join(",")}</p>`;
        dispevents.appendChild(eventDiv);
    });
}
if(checkForm && radioForm){
checkForm.addEventListener("change",filterEvents);
radioForm.addEventListener("change",filterEvents);
}
filterEvents();