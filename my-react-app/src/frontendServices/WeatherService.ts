class WeatherService {
 static getTemperature (temp) {
     return (temp -273.15).toFixed(1)
 }
 static getPressure (pressure) {
     return (pressure * 0.750063).toFixed(0)
 }
}

export default WeatherService;