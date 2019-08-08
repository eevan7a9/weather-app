const key = " ";
let city = "manila";

const getCoord = function() {
  let long;
  let lat;
  if (navigator.geolocation) {
    console.log("yeah");
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      console.log(lat, long);
      fetch(
        // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`,
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}2&lon=${long}&appid=${key}`,
      )
        .then(response => response.json())
        .then(data => console.log(data));
    });
  } else {
    console.log("false");
  }
};
console.log;
getCoord();
