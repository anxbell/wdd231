async function fetchLevels() {
    try {
        const response = await fetch('data/memberships.json');
        const memberships = await response.json();
        displayMemberships(memberships);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// display membership levels

function displayMemberships(memberships) {
    const levelsContainer = document.getElementById('levels');

    // Check if levelsContainer exists
    if(levelsContainer) {
        

        memberships.forEach(membership => {
            const membershipCard = document.createElement('div');
            membershipCard.classList.add('membership-card');

            // Dynamically assign a class based on the membership name
            switch (membership.title) {
                case 'Bronze Membership':
                    membershipCard.classList.add('bronze');
                    break;
                case 'Silver Membership':
                    membershipCard.classList.add('silver');
                    break;
                case 'Gold Membership':
                    membershipCard.classList.add('gold');
                    break;
                case 'NP Membership':
                    membershipCard.classList.add('np');
                    break;
                default:
                    break;
            }            
   
            membershipCard.innerHTML = `
            
                    <h2>${membership.title}</h2>
                    <p>Learn More<p>

            `;

            membershipCard.addEventListener('click', () => displayMembershipDetails(membership));

            levelsContainer.appendChild(membershipCard);
        });
    }
}

function displayMembershipDetails(membership){

    const membershipDetails = document.getElementById("membership-details");
    membershipDetails.innerHTML = '';
    membershipDetails.innerHTML = `

        <button id="closeModal"> &#10006; </button>
        <div class="modal-header">
        <h1>${membership.title}</h1>
        </div>
        <div class="modal-body">
        <p>${membership.description}</p>
        <h2>Benefits</h2>
        <ul>
            ${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
        </div>

        
    `;
    membershipDetails.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        membershipDetails.close();
    });

      // Event listener to close the modal when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === membershipDetails) {
            membershipDetails.close();
        }
    });
}

// Set the current timestamp in the hidden input field before form submission
const form = document.querySelector('.designOne'); // Select your form
const timestampInput = document.getElementById('timestamp');

if (form && timestampInput) {
    form.addEventListener('submit', () => {
        timestampInput.value = Date.now(); // Set the current time in milliseconds
        console.log('Timestamp set to:', timestampInput.value); // Log the timestamp value
    });
}



fetchLevels();
