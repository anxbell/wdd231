const apiKey = '3524b4414b12d402ed0bdc2e835ccf4a';
const lat = '13.6929';
const lon = '-89.2182'; 

// Fetch weather data
async function getWeatherData() {
    try {
        // Current weather API
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
        if (!weatherResponse.ok) throw new Error('Failed to fetch current weather data');
        
        const weatherData = await weatherResponse.json();
        console.log('Current Weather Data:', weatherData); // Log current weather data

        // Call the function to display current weather
        displayCurrentWeather(weatherData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Display current weather 
function displayCurrentWeather(data) {
    document.getElementById("currentTemperature").textContent = `Temperature: ${Math.round(data.main.temp)}°F`;
    document.getElementById("currentDescription").textContent = data.weather.map(event => capitalizeWords(event.description)).join(', ');
    document.getElementById("highTemperature").textContent = `High: ${Math.round(data.main.temp_max)}°F`;
    document.getElementById("lowTemperature").textContent = `Low: ${Math.round(data.main.temp_min)}°F`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("sunrise").textContent = `Sunrise: ${formatTime(data.sys.sunrise)}`;
    document.getElementById("sunset").textContent = `Sunset: ${formatTime(data.sys.sunset)}`;
}

// Format sunrise and sunset times
function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Capitalize each word
function capitalizeWords(str) {
    return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

// Call the function to fetch and display data
getWeatherData();