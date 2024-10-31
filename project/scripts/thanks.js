const currentUrl = window.location.href;
const everything = currentUrl.split('?');

// Second half 
let formData = everything[1]?.split('&') || []; // Handle potential absence of query string

// Retrieve specific data from the query string
function show(data) {
    let result = ''; 
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split('=')[1]; 
            result = result.replace(/\+/g, " "); 
            result = decodeURIComponent(result); // Decode any URI components
        }
    });
    return result;
}

// Show the result in the thank you message
const showInfo = document.querySelector('#thanks');
showInfo.innerHTML = `
    <h2>Thank you for choosing Ethereal Blooms, ${show("first")}!<br>Your beautiful bouquet will bloom soon.</h2>
    <br>
    <p><strong>Order Details:</strong></p>
    <p><strong>Name:</strong> ${show("first")} ${show("last")}</p>
    <p><strong>Email:</strong> ${show("email")}</p>
    ${show("phone") ? `<p><strong>Phone:</strong> ${show("phone")}</p>` : ''}
    ${show("organizationTitle") ? `<p><strong>Organizational Title:</strong> ${show("organizationTitle")}</p>` : ''}
    ${show("organization") ? `<p><strong>Business/Organization:</strong> ${show("organization")}</p>` : ''}
    <p><strong>Flower Arrangement:</strong> ${show("membership") || "N/A"}</p>
    <p>We will be in touch with you soon to arrange the delivery of your blooms!</p>
`;

// Get and display formatted timestamp on thank-you page
const timestampDisplay = document.getElementById('timestamp-display');
const timestampValue = show("timestamp"); // Retrieve timestamp from URL query

if (timestampValue) {
    const formattedTimestamp = formatTimestamp(timestampValue);
    timestampDisplay.textContent = `Date: ${formattedTimestamp}`;
} else {
    timestampDisplay.textContent = 'Date: Not available';
}

// Timestamp formatting function
function formatTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp, 10)); 
    if (isNaN(date)) return 'Invalid Date';

    return date.toLocaleString('en-US', {
        month: '2-digit', day: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
}



