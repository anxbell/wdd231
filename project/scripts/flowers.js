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




