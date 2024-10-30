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

// Format and display the timestamp
function formatTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp, 10)); 
    if (isNaN(date)) {
        console.error('Invalid date:', timestamp); 
        return 'Invalid Date';
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based in JavaScript
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    // Add leading zeros if necessary
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    const formattedSecond = second < 10 ? `0${second}` : second;

    return `${month}/${day}/${year} - ${formattedHour}:${formattedMinute}:${formattedSecond}`;
}

// Display the formatted timestamp
const timestampDisplay = document.getElementById('timestamp-display');
const timestampValue = show("timestamp");
if (timestampValue) { // Check if the timestamp is available
    const formattedTimestamp = formatTimestamp(timestampValue);
    timestampDisplay.textContent = `Date: ${formattedTimestamp}`;
    console.log('Formatted Timestamp:', formattedTimestamp); // Log the formatted timestamp
} else {
    timestampDisplay.textContent = 'Date: Not available'; // Fallback message if timestamp is missing
    console.log('Timestamp value not found, displaying "Not available".'); // Log fallback message
}
