// Fetch bouquet data 
async function fetchBouquets() {
    try {
        const response = await fetch('data/flowers.json'); // Adjust the path as needed
        const bouquets = await response.json();
        displaySpotlightBouquets(bouquets);
    } catch (error) {
        console.error('Error fetching bouquets:', error);
    }
}

// Display spotlight bouquets
function displaySpotlightBouquets(bouquets) {
    const spotlightContainer = document.querySelector('.image-grid');
    spotlightContainer.innerHTML = ''; // Clear current content

    // Filter spotlight bouquets
    const spotlightBouquets = bouquets.filter(bouquet => bouquet.spotlight === true);

    // Select 4 random bouquets
    const randomSpotlightBouquets = getRandomBouquets(spotlightBouquets, 5);

    randomSpotlightBouquets.forEach(bouquet => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.innerHTML = `
            <img src="${bouquet.image}" alt="${bouquet.name}">
            <div class="item-name">${bouquet.name}</div>
            <div class="item-price">${bouquet.price}</div>
            <a href="#" class="item-button">More info</a>
        `;
        spotlightContainer.appendChild(itemCard);
    });
}

// Function to get random bouquets
function getRandomBouquets(bouquets, count) {
    const shuffled = bouquets.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Execute the fetch function on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchBouquets();
});


// Fetch flower data from JSON
fetch('flowers.json')
    .then(response => response.json())
    .then(data => {
        displayFlowers(data);
    })
    .catch(error => console.error('Error fetching data:', error));

function displayFlowers(flowers) {
    const flowerList = document.getElementById('flower-list');
    flowers.forEach(flower => {
        const flowerItem = document.createElement('div');
        flowerItem.className = 'flower-item';
        flowerItem.innerHTML = `
            <h3>${flower.name}</h3>
            <p>${flower.shortDescription}</p>
            <button onclick="showDialog('${flower.name}', '${flower.description}')">More Info</button>
        `;
        flowerList.appendChild(flowerItem);
    });
}

function showDialog(title, description) {
    document.getElementById('dialog-title').innerText = title;
    document.getElementById('dialog-description').innerText = description;
    document.getElementById('flower-dialog').style.display = 'block';
}

document.getElementById('close-dialog').onclick = function() {
    document.getElementById('flower-dialog').style.display = 'none';
}

// Close the dialog when clicking outside of it
window.onclick = function(event) {
    const dialog = document.getElementById('flower-dialog');
    if (event.target === dialog) {
        dialog.style.display = 'none';
    }
}

