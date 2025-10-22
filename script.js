function getLocation() {
  navigator.geolocation.getCurrentPosition((x) =>
    console.log(x.coords.latitude)
  );
  navigator.geolocation.getCurrentPosition((x) =>
    console.log(x.coords.longitude)
  );
}

// getLocation();


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

  const locations = [dt.results[0]["latitude"], dt.results[0]["longitude"]];

  return locations;
}

function getAllData(city) {
  const locations = getGeolocation(city);
  locations.then((data) => {
    console.log(data);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${data[0]}&longitude=${data[1]}&current=temperature_2m%2Crelative_humidity_2m%2Crain%2Cweather_code`;
    const weatherAPIData = fetchData(url);
    weatherAPIData.then((data) => {
      console.log(data);
    });
  });

  const weatherCodes = fetchData("./weather-codes.json");
  weatherCodes.then((data) => {
    console.log(data);
  });

}

getAllData("Bern");
