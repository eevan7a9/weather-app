window.addEventListener("load", () => {
  const key = "";
  const time = document.querySelector("#time");
  const sunrise = document.querySelector("#sunrise");
  const sinset = document.querySelector("#sunset");
  const temp = document.querySelector("#temperature");
  const text = document.querySelector("#text_info");

  setInterval(() => {
    time.innerHTML = getTime();
  }, 1000);
  getCoord(key, temp, text, sunrise, sinset);
});
const getTextInfo = function(temperature) {
  const temp = Math.round(temperature);
  console.log(temp);
  if (temp >= 302) {
    return "It's Hot";
  } else if (temp < 302 && temp >= 300) {
    return "It's Warm";
  } else if (temp < 300 && temp > 295) {
    return "It's Cool";
  } else if (temp < 295 && temp > 288) {
    return "It's Cold";
  } else {
    return "It's very Cold";
  }
};
const convertKelvin = function(value, to) {
  if (to == "celsius") {
    return Math.round((value - 273.15) * 100) / 100 + " C&deg";
  } else if (to == "Fahrenheit") {
    return Math.round(((value * 9) / 5 - 459.67) * 100) / 100 + " F&deg";
  }
};

const getTime = function(unix_time) {
  let date = new Date();
  if (unix_time) {
    date = new Date(unix_time * 1000);
  }
  const hours = date.getHours();
  const am_pm = hours >= 12 ? "pm" : "am";
  const new_hours = hours % 12;
  const twelve_hours_format = new_hours ? new_hours : 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${twelve_hours_format}:${minutes}:${seconds} ${am_pm}`;
};

const getCoord = function(key, temp, text_info, sunrise, sunset) {
  let long;
  let lat;
  if (navigator.geolocation) {
    console.log("yeah");
    navigator.geolocation.getCurrentPosition(
      position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        console.log(lat, long);
        fetch(
          // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`,
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}2&lon=${long}&appid=${key}`,
        )
          .then(response => response.json())
          .then(data => {
            console.log(JSON.stringify(data));
            temp.innerHTML = convertKelvin(data.main.temp, "celsius");
            text_info.innerHTML = getTextInfo(data.main.temp);
            sunrise.innerHTML = getTime(data.sys.sunrise);
            sunset.innerHTML = getTime(data.sys.sunset);
          });
      },
      error => {
        if (error.code == error.PERMISSION_DENIED) {
          console.log("you denied me");
        }
      },
    );
  } else {
    console.log("false");
  }
};
