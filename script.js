const advices = {
  Cloudy: "some advice",
  Rain: "some advice",
  Sunny: "some advice",
  Clear: "some advice",
  Foggy: "some advice",
  Drizzle: "some advice",
  Snow: "some advice",
  Showers: "some advice",
  Thunderstorm: "some advice",
};

const searchCity = document.getElementById("search-city");
const button = document.getElementById("btn");
const cityName = document.getElementById("city-name");
const display = document.getElementById("display");
const advice = document.getElementById("advice");

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP err! Status : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data", error);
    throw error;
  }
}

async function getGeolocation(city) {
  const dt = await fetchData(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
  );

  const locations = {
    latitude: dt.results[0]["latitude"],
    longitude: dt.results[0]["longitude"],
    city: dt.results[0]["name"],
  };
  console.log(locations);

  return locations;
}

function getAllData(city) {
  let weather_code = 0;
  let temperature = 0;
  const locations = getGeolocation(city);
  locations.then((data) => {
    console.log(data);

    //we get here just latitude and longitude
    cityName.innerText = data.city;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current=temperature_2m%2Crelative_humidity_2m%2Crain%2Cweather_code`;
    const weatherAPIData = fetchData(url);
    weatherAPIData.then((data) => {
      console.log(data);

      temperature = data.current.temperature_2m;
      weather_code = data.current.weather_code;
      const weatherCodes = fetchData("./weather-codes.json");
      weatherCodes.then((data) => {
        console.log(data[weather_code].day.image);
        console.log(weather_code);

        const desc = data[weather_code].day.description;
        const img = data[weather_code].day.image;

        display.innerHTML = `Description: ${desc} <br> <img src="${img}" > <br> <span>${temperature}</span>`;

        switch (desc) {
          case "Cloudy":
            advice.textContent = "some advice";
            break;
          case "Rain":
            advice.textContent = "some advice";
            break;
          case "Sunny":
            advice.textContent = "some advice";
            break;

          case Clear:
            advice.textContent = "some advice";
            break;

          case Foggy:
            advice.textContent = "some advice";
            break;

          case Drizzle:
            advice.textContent = "some advice";
            break;

          case Snow:
            advice.textContent = "some advice";
            break;

          case Showers:
            advice.textContent = "some advice";
            break;

          case Thunderstorm:
            advice.textContent = "some advice";
            break;

          default:
            advice.textContent = "no advice right now";
            break;
        }
      });
    });
  });
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(searchCity.value);

  getAllData(searchCity.value);
});
