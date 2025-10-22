const url =
  "https://api.open-meteo.com/v1/forecast?latitude=46.9481&longitude=7.4474&current=temperature_2m%2Crelative_humidity_2m%2Crain%2Cweather_code";

async function fetchWeatherData(url) {
  try {
    fetch(url)
      .then((response) => {
        
      })
      .then((data) => {});
  } catch (error) {
    console.error("Error fetching weather data", error);
    throw error;
  }
}
