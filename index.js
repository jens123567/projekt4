fetch(
  "https://api.weatherapi.com/v1/forecast.json?key=07dd09ee78f34997b5664221211904&q=Stockholm&days=7&aqi=no&alerts=no"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    document.querySelector("#city").innerText = data.location.name;

    document.querySelector("#temprature").innerText =
      data.current.temp_c + "°C";

    let hourlyTemp3Day = data.forecast.forecastday;

    let hourlyTemp = hourlyTemp3Day[0].hour;

    for (let i = 0; i < hourlyTemp.length; i++) {
      //skapar huvud elementet
      let element = document.createElement("div");
      element.classList.add("timeElement");

      // tar ut tempraturen
      let temp = document.createElement("div");
      temp.innerText = hourlyTemp[i].temp_c + "°C";
      element.appendChild(temp);

      // tar ut timmen
      let hour = document.createElement("div");
      let time = hourlyTemp[i].time.split(" ");
      hour.innerText = time[1];
      element.appendChild(hour);

      //sätter elementen där de ska vara
      let mainElement = document.querySelector(".scrollMenu");
      mainElement.appendChild(element);
    }
    let sunriseSunset = hourlyTemp3Day[0].astro;
    let sunrise = sunriseSunset.sunrise.split(" ");
    let sunset = sunriseSunset.sunset.split(" ");

    document.querySelector("#sunrise").innerText = "Sunrise: " + sunrise[0];
    document.querySelector("#sunset").innerText = "Sunset " + sunset[0];
  });
