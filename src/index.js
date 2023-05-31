const tempEl = document.getElementById("temp");
const pressureEl = document.getElementById("pressure");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("windSpeed");
const timeEl = document.getElementById("time");
const updatedTimeEl = document.getElementById("updatedTime");

function appendTextNode(parentNode, text) {
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
  //timeEl.textContent = formattedDate;
}

function createSVG(svgPath) {
  const svg = document.getElementById("weatherIcon"); // SVG elemanının id'sini belirtin veya yeni bir SVG elementi oluşturunvar path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", svgPath); // Path verisini belirtin
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
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
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

      const svgPath = VisualData[weatherKey].svgPath; // SVGPath["Clear"];
      const imgPath = VisualData[weatherKey].imgPath; // SVGPath["Clear"];

      createSVG(svgPath);
      setWeatherImage(imgPath);

      appendTextNode(pressureEl, `${weatherInfo.pressure} hPa`);
      appendTextNode(humidityEl, `${weatherInfo.humidity} %`);
      appendTextNode(windEl, `${weatherInfo.windSpeed} m/s`);

      // set updated date to html
      const date = new Date();
      const formattedDate = date.toLocaleString(locale, options);
      updatedTimeEl.textContent = `Updated time : ${formattedDate}`;
    })
    .catch((error) => {
      console.log("Hata:", error);
    });
}
