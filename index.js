fetch(
  "https://api.weatherapi.com/v1/forecast.json?key=07dd09ee78f34997b5664221211904&q=Stockholm&days=7&aqi=no&alerts=no"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // namn på staden (stockholm)
    document.querySelector("#city").innerText = data.location.name;
    // temperaturen just nu
    document.querySelector("#temprature").innerText =
      data.current.temp_c + "°C";

    // vädret för tre dagar
    let hourlyTemp3Day = data.forecast.forecastday;

    // vädret för dagen timme för timme
    let hourlyTemp = hourlyTemp3Day[0].hour;

    // skapar timmprognosen
    for (let i = 0; i < hourlyTemp.length; i++) {
      // skapar huvud elementet
      let element = document.createElement("div");
      // skapar höjd på elementen beroende på temperatur den timmen
      let graphHeigt = 80 + 6 * hourlyTemp[i].temp_c;
      element.style.height = graphHeigt + "px";
      element.classList.add("timeElement");

      // skapar div för informationen temp och timme
      let element2 = document.createElement("div");
      let time = hourlyTemp[i].time.split(" ");

      // skapar diven för tid och temperatur
      element2.innerHTML = `
        <div>${time[1]}</div>
        <div>${hourlyTemp[i].temp_c}°C</div>
      `;
      element.appendChild(element2);

      // sätter elementen där de ska vara
      document.querySelector(".scrollMenu").appendChild(element);
    }

    // Hämtar sol upp och ned
    let sunriseSunset = hourlyTemp3Day[0].astro;
    let sunrise = sunriseSunset.sunrise.split(" ");
    let sunset = sunriseSunset.sunset.split(" ")[0].split(":");
    sunset = parseInt(sunset[0]) + 12 + ":" + sunset[1];

    //placerar sol upp och ned
    document.getElementById("sunrise").innerText = "Sunrise: " + sunrise[0];
    document.querySelector("#sunset").innerText = "Sunset " + sunset;

    // skapar element för prognosen
    for (let i = 0; i < hourlyTemp3Day.length; i++) {
      let container = document.createElement("div");
      container.className = "forecastContainer";

      // div för datumet som prognosen visas
      let div = document.createElement("div");
      div.className = "forecastDate";
      div.innerHTML = `
      <div>${hourlyTemp3Day[i].date}</div>
      `;
      container.appendChild(div);

      // max och min temperatur
      let div2 = document.createElement("div");
      div2.className = "forecastTemp";
      div2.innerHTML = `
      <div id="maxTemp">${hourlyTemp3Day[i].day.maxtemp_c}  </div>
      <div>${hourlyTemp3Day[i].day.mintemp_c}</div>
      `;

      container.appendChild(div2);

      document.querySelector("#forecast").appendChild(container);
    }
  })
  .catch(console.error);
