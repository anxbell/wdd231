document.addEventListener('DOMContentLoaded', () => {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', function() {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

});

function calculateDaysBetween(lastVisit) {
    const currentDate = new Date();
    const previousDate = new Date(lastVisit);
    const timeDifference = currentDate - previousDate;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}

// Function to display the visit message
function displayVisitMessage() {
    const visitDiv = document.getElementById('visit'); // Select the div to insert the message
    let lastVisit = localStorage.getItem('lastVisit');
    let message = '';

    if (!lastVisit) {
        // First visit
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysBetween = calculateDaysBetween(lastVisit);
        if (daysBetween < 1) {
            // If last visit was less than a day ago
            message = 'Back so soon! Awesome!';
        } else if (daysBetween === 1) {
            // If last visit was exactly one day ago
            message = 'You last visited 1 day ago.';
        } else {
            // If last visit was more than one day ago
            message = `You last visited ${daysBetween} days ago.`;
        }
    }


    visitDiv.innerHTML = `<h1>${message}</h1>`;


    localStorage.setItem('lastVisit', new Date());
}

// Call the function when the page loads
window.onload = displayVisitMessage;


// footer dates
const currentYear = document.getElementById("currentyear");
const lastModification = document.getElementById("lastModified");
const today = new Date();

currentYear.innerHTML = today.getFullYear();
lastModification.innerHTML = "Last Update: " + document.lastModified;