// footer dates
const currentYear = document.getElementById("currentyear");
const lastModification = document.getElementById("lastModified");
const today = new Date();

currentYear.innerHTML = today.getFullYear();
lastModification.innerHTML = "Last Update: " + document.lastModified;



document.addEventListener('DOMContentLoaded', () => {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', function() {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

});



// Fetch member data 
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
        displaySpotlight(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// display members
function displayMembers(members) {
    const memberContainer = document.getElementById('member-container');
    if (memberContainer) {
        memberContainer.innerHTML = '';

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}" class="member-image">
                <div class="member-details">
                    <h2>${member.name}</h2>
                    <p>${member.description}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
                </div>
            `;
            memberContainer.appendChild(memberCard);
        });
    }
}

//  display spotlight members 
function displaySpotlight(members) {
    const spotlightContainer = document.querySelector('.spotlight');
    spotlightContainer.innerHTML = ''; // Clear current content

    // Filter 
    const spotlightMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

    //select 2-3 members 
    const randomSpotlight = getRandomMembers(spotlightMembers, 3);


    randomSpotlight.forEach(member => {
        const spotlightItem = document.createElement('div');
        spotlightItem.classList.add('item');
        spotlightItem.innerHTML = `
            <div class="subheading">
                <h2>${member.name}</h2>
                <h3>${member.description}</h3>
            </div>
            <hr>
            <p>Email: info@${member.name.toLowerCase().replace(/\s+/g, '')}.com</p>
            <p>Phone: ${member.phone}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        spotlightContainer.appendChild(spotlightItem);
    });
}


function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return 'Member';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        default:
            return 'Unknown';
    }
}


function getRandomMembers(members, count) {
    const shuffled = members.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const lastModified = document.lastModified;

    document.getElementById('currentyear').textContent = year;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;
});


fetchMembers();



