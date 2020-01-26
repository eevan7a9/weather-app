const key = "7bc9087a5d9e43d6828e0e5e3f341b89";
const country = document.querySelector("#country");
const time = document.querySelector("#time");
const sunrise = document.querySelector("#sunrise");
const sinset = document.querySelector("#sunset");
const description = document.querySelector("#description");
const temp = document.querySelector("#temperature");
const text = document.querySelector("#text_info");
const icon = document.querySelector("#icon");
const calendar = document.querySelector("#calendar_ui");
const year_month = document.querySelector("#year_month");
const body = document.querySelector("body");
const calendarBg = document.querySelector(".section-c");
const showMyWeather = document.querySelector("#showMyWeather");

showMyWeather.addEventListener("click", () => {
  showMyWeather.textContent = "Allow Geolocation";
  showMyWeather.disabled = true;
  setInterval(() => {
    time.innerHTML = getTime();
  }, 1000);
  getWeather(key, country, icon, description, temp, text, sunrise, sinset);
  calendarInit(calendar, year_month);
});

const getTextInfo = function(temperature, description, hours) {
  const temp = Math.round(temperature);

  if (temp >= 302) {
    if (
      description == "rain" ||
      description == "shower rain" ||
      description == "thunderstorm"
    ) {
      return "It's Cool";
    } else if (hours < 6 || hours > 17) {
      return "It's cool";
    }
    return "It's Hot";
  } else if (temp < 302 && temp >= 300) {
    if (
      description == "rain" ||
      description == "shower rain" ||
      description == "thunderstorm"
    ) {
      return "It's Cool";
    } else if (hours < 6 || hours > 17) {
      return "It's cool";
    }
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

const getBackground = function(description) {
  switch (description) {
    case "clear sky":
      body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1469217329261-b173b63012f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      calendarBg.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1469217329261-b173b63012f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      break;
    case "few clouds":
      body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1565840720726-322e8aeb474b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      calendarBg.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1565840720726-322e8aeb474b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      break;
    case "scattered clouds":
      body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1563289723-61a8ca980c43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1439&q=80')";
      calendarBg.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1563289723-61a8ca980c43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1439&q=80')";
      break;
    case "broken clouds":
      body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1478191649591-05abc4bc29d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80')";
      calendarBg.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1478191649591-05abc4bc29d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80')";
      break;
    case "shower rain":
      body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1494007485290-ce668e189d92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      calendarBg.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1494007485290-ce668e189d92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      break;
    case "rain":
      body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      calendarBg.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      break;
    case "thunderstorm":
      body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1574781481375-74a09eba71e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      calendarBg.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1574781481375-74a09eba71e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      break;
    case "snow":
      body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1547754980-3df97fed72a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      calendarBg.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1547754980-3df97fed72a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
      break;
    case "mist":
      body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1482841628122-9080d44bb807?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')";
      calendarBg.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1482841628122-9080d44bb807?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')";
      break;

    default:
      break;
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

const getWeather = function(
  key,
  country,
  icon,
  description,
  temp,
  text_info,
  sunrise,
  sunset
) {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        // console.log(lat, long);
        fetch(
          // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`,
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}2&lon=${long}&appid=${key}`
        )
          .then(response => response.json())
          .then(data => {
            // console.log(JSON.stringify(data));
            country.textContent = data.sys.country;
            console.log(data.weather[0].icon);
            // we add icon
            icon.src = `img/${data.weather[0].icon}.png`;
            icon.classList.remove("enlarge_img");
            description.textContent = data.weather[0].description;
            temp.innerHTML = convertKelvin(data.main.temp, "celsius");
            text_info.textContent = getTextInfo(
              data.main.temp,
              data.weather[0].description,
              new Date().getHours()
            );
            sunrise.textContent = getTime(data.sys.sunrise);
            sunset.textContent = getTime(data.sys.sunset);
            getBackground(data.weather[0].description);
          });
      },
      error => {
        if (error.code == error.PERMISSION_DENIED) {
          console.log("you denied me");
        }
      }
    );
  } else {
    console.log("false");
  }
};
const calendarInit = function(calendar, year_month) {
  const date_full = new Date();
  const options = { month: "long" };
  const month_long = new Intl.DateTimeFormat("en-US", options).format(
    date_full
  );
  year_month.innerHTML = `${date_full.getFullYear()}, ${month_long}`;
  // we get the numbe of days this month
  const num_of_days = new Date(
    date_full.getFullYear(),
    date_full.getMonth() + 1,
    0
  ).getDate();
  // we get the day of the first date
  const start_day = new Date(
    date_full.getFullYear(),
    date_full.getMonth(),
    1
  ).getDay();
  let date_start = 1;
  // console.log(num_of_days);
  for (let x = 0; x < 6; x++) {
    const row_div = document.createElement("div");
    row_div.classList.add("row-div", "a");
    calendar.appendChild(row_div);

    for (let y = 0; y < 7; y++) {
      const column_div = document.createElement("div");
      const blank_div = document.createTextNode(` `);
      column_div.appendChild(blank_div);
      column_div.classList.add("column-div");
      row_div.appendChild(column_div);
      if (x == 0 && start_day > y) {
        column_div.innerHTML = " ";
      } else if (date_start > num_of_days) {
        column_div.innerHTML = " ";
      } else {
        column_div.innerHTML = `<span class="date">${date_start}</span>`;
        if (date_start === new Date().getDate()) {
          column_div.innerHTML = `<span class="today">${date_start}</span>`;
        }
        column_div.classList.add("column-div");
        date_start++;
      }
    }
    calendar.appendChild(row_div);
  }
};
