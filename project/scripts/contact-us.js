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

    if (levelsContainer) {
        flowers.forEach(flower => {
            const flowerCard = document.createElement('div');
            flowerCard.classList.add('membership-card', flower.membershipLevel);

            flowerCard.innerHTML = `
                <h2>${flower.title}</h2>
                <p>Learn More</p>
            `;

            flowerCard.addEventListener('click', () => displayFlowerDetails(flower));

            levelsContainer.appendChild(flowerCard);
        });
    }
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
            <h2>Weather Suitability</h>
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
