async function fetchFlowers() {
    try {
        const response = await fetch('data/flower-info.json');
        const flowers = await response.json();
        displayFlowers(flowers);
    } catch (error) {
        console.error('Error fetching flowers:', error);
    }
}

// Display flower types with membership level styling
function displayFlowers(flowers) {
    const levelsContainer = document.getElementById('levels');
    levelsContainer.innerHTML = ''; // Clear previous content

    if (levelsContainer) {
        flowers.forEach(flower => {
            const flowerCard = createFlowerCard(flower); // Use the createFlowerCard function
            levelsContainer.appendChild(flowerCard);
        });
    }
}

function createFlowerCard(flower) {
    const flowerCard = document.createElement('div');
    flowerCard.classList.add('membership-card', flower.membershipLevel);

    // Add the prefix "Flower Arrangement: " to the title
    flowerCard.innerHTML = `
        <h2>Flower Arrangement: ${flower.title}</h2>
        <p>Learn More</p>
    `;

    flowerCard.addEventListener('click', () => displayFlowerDetails(flower));
    return flowerCard;
}

function displayFlowerDetails(flower) {
    const flowerDetails = document.getElementById("membership-details");
    flowerDetails.innerHTML = '';

    flowerDetails.innerHTML = `
        <button id="closeModal"> &#10006; </button>
        <div class="modal-header">
            <h1>${flower.title}</h1>
        </div>
        <div class="modal-body">
            <p>${flower.description}</p>
            <h2>Benefits</h2>
            <ul>
                ${flower.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
            <h2>Weather Suitability</h2>
            <p>${flower.weather}</p>
        </div>
    `;
    flowerDetails.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        flowerDetails.close();
    });

    window.addEventListener('click', (event) => {
        if (event.target === flowerDetails) {
            flowerDetails.close();
        }
    });
}

fetchFlowers();

// Set the current timestamp in the hidden input field before form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.designOne'); // Select your form
    const timestampInput = document.getElementById('timestamp');

    if (form && timestampInput) {
        form.addEventListener('submit', () => {
            timestampInput.value = Date.now(); // Set the current time in milliseconds
            console.log('Timestamp set to:', timestampInput.value); // Log the timestamp value
        });
    }

    fetchLevels(); // Call the function to fetch levels (make sure this function is defined elsewhere in your script)
});
