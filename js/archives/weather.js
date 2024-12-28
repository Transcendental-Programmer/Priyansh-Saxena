class WeatherService {
    static async getWeather(city = 'Gwalior') {
        const API_KEY = 'YOUR_API_KEY'; // Replace with actual API key
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            return this.formatWeatherData(data);
        } catch (error) {
            return 'Weather service temporarily unavailable';
        }
    }

    static formatWeatherData(data) {
        return `
🌡️ Temperature: ${Math.round(data.main.temp)}°C
💨 Wind: ${data.wind.speed} m/s
💧 Humidity: ${data.main.humidity}%
🌤️ Conditions: ${data.weather[0].description}
`;
    }
}
