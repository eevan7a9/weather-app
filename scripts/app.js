const key = "7bc9087a5d9e43d6828e0e5e3f341b89";
let city = "manila";
const convertKelvin = function(value, to) {
  if (to == "c") {
    return value - 273.15;
  } else if (to == "f") {
    return (value * 9) / 5 - 459.67;
  }
};
const getTimeFromUnix = function(unix_time) {
  const date = new Date(unix_time * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};
const getCoord = function() {
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
          .then(data => console.log(data));
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

getCoord();
