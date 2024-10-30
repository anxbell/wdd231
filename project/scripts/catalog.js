// Show the dialog with flower information
function showDialog(title, description, price) {
    document.getElementById('dialog-title').innerText = title;
    document.getElementById('dialog-description').innerText = description;
    document.getElementById('dialog-price').innerText = `Price: ${price}`; // Add price to dialog
    document.getElementById('flower-dialog').style.display = 'block';
}

// Close the dialog
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

// Fetch bouquet data 
async function fetchBouquets() {
    try {
        const response = await fetch('data/flowers.json'); // Adjust the path as needed
        const bouquets = await response.json();
        displayAllBouquets(bouquets);
        setupSorting(bouquets); // Set up sorting after fetching the data
    } catch (error) {
        console.error('Error fetching bouquets:', error);
    }
}

// Display all bouquets in the catalog
function displayAllBouquets(bouquets) {
    const catalogContainer = document.querySelector('.bouquet-grid');
    catalogContainer.innerHTML = ''; // Clear current content

    bouquets.forEach(bouquet => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.innerHTML = `
            <img src="${bouquet.image}" alt="${bouquet.name}">
            <div class="item-name">${bouquet.name}</div>
            <div class="item-price">${bouquet.price}</div>
            <a href="#" class="item-button">More info</a>
        `;

        // Add event listener to the "More info" button
        itemCard.querySelector('.item-button').onclick = (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            showDialog(bouquet.name, bouquet.description, bouquet.price); // Show dialog with bouquet info
        };

        catalogContainer.appendChild(itemCard);
    });
}

// Setup sorting functionality
function setupSorting(bouquets) {
    const sortOptions = document.getElementById('sort-options');
    
    sortOptions.addEventListener('change', () => {
        const sortedBouquets = sortBouquets(bouquets, sortOptions.value);
        displayAllBouquets(sortedBouquets);
    });
}

// Function to sort bouquets based on selected criteria
function sortBouquets(bouquets, criteria) {
    switch (criteria) {
        case 'price-asc':
            return [...bouquets].sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        case 'price-desc':
            return [...bouquets].sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        case 'name-asc':
            return [...bouquets].sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return [...bouquets].sort((a, b) => b.name.localeCompare(a.name));
        case 'popularity-desc':
            return [...bouquets].sort((a, b) => b.popularity - a.popularity); // Sort by popularity
        case 'new-arrivals':
            return [...bouquets].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); // Sort by date added
        default:
            return bouquets; // No sorting if the criteria is not recognized
    }
}

// Execute the fetch function on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchBouquets();
});
