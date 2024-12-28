export class WeatherService {
    constructor() {
        // Replace with your actual API key
        this.API_KEY = '8d9f720290ca9a1ada51726c5fbf849f';
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async getWeather(city = 'Gwalior') {
        if (!this.API_KEY || this.API_KEY === 'YOUR_API_KEY') {
            return { error: 'Weather API key not configured' };
        }

        try {
            const response = await fetch(
                `${this.BASE_URL}?q=${city}&appid=${this.API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            return {
                temperature: Math.round(data.main.temp),
                conditions: data.weather[0].description,
                city: data.name
            };
        } catch (error) {
            console.error('Weather service error:', error);
            return { error: 'Unable to fetch weather data' };
        }
    }

    formatWeatherOutput(weatherData) {
        if (weatherData.error) {
            return `🌡️ ${weatherData.error}\n`;
        }
        
        return `
🌤️ Current Weather in ${weatherData.city}:
Temperature: ${weatherData.temperature}°C
Conditions: ${weatherData.conditions}
\n`;
    }
}
