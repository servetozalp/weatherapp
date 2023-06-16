const tempEl = document.getElementById("temp");
const pressureEl = document.getElementById("pressure");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("windSpeed");
const timeEl = document.getElementById("time");
const updatedTimeEl = document.getElementById("updatedTime");

function appendTextNode(parentNode, text) {
  var lastChild = parentNode.lastChild;
  if (lastChild) {
    parentNode.removeChild(lastChild);
  }
  const textNode = document.createTextNode(text);
  parentNode.appendChild(textNode);
}

const API_KEY = "e1f4c2cc28753adbfbdb5803e9475e56";
const lon = "18.063240";
const lat = "59.334591";

const second = 1000;
const minute = second * 60;

const locale = "sv-SE";
const options = {
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

function previewDate() {
  const date = new Date();
  const formattedDate = date.toLocaleString(locale, options);
  timeEl.textContent = formattedDate;
}

function createSVG(weatherKey, description) {
  const svgPath = VisualData[weatherKey].svgPath; // SVGPath["Clear"];
  const svg = document.getElementById("weatherIcon");
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const titleElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "title"
  );
  titleElement.textContent = description;
  path.setAttribute("d", svgPath);

  svg.appendChild(titleElement);
  svg.appendChild(path);
}

function setWeatherImage(imgPath) {
  const img = document.getElementById("weatherImage");
  img.setAttribute("src", imgPath); // Img src set
}

previewDate();
setInterval(previewDate, second);

fetchWeather();
setInterval(fetchWeather, minute * 30);

function fetchWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sv&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const weatherInfo = {
        temp: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };

      console.log();

      appendTextNode(tempEl, `${weatherInfo.temp.toFixed(1)} °C`);
      const weatherKey = data.weather[0].main; // Clear
      const description = data.weather[0].description;

      const imgPath = VisualData[weatherKey].imgPath; // SVGPath["Clear"];

      createSVG(weatherKey, description);
      setWeatherImage(imgPath);

      appendTextNode(pressureEl, `${weatherInfo.pressure} hPa`);
      appendTextNode(humidityEl, `${weatherInfo.humidity} %`);
      appendTextNode(windEl, `${weatherInfo.windSpeed} m/s`);

      // set updated date to html
      const date = new Date();
      const formattedDate = date.toLocaleString(locale, options);
      updatedTimeEl.textContent = `Prognosen utfärdades  ${formattedDate}`;
    })
    .catch((error) => {
      console.log("Error", error);
    });
}
