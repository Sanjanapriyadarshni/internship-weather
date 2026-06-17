const API_KEY = "4d0755262826b79c040e4f3018bb8921";

const cityInput =
document.getElementById("cityInput");

const searchBtn =
document.getElementById("searchBtn");

const cityName =
document.getElementById("cityName");

const currentTemp =
document.getElementById("currentTemp");

const mainTemp =
document.getElementById("mainTemp");

const weatherDesc =
document.getElementById("weatherDesc");

const mainCondition =
document.getElementById("mainCondition");

const humidity =
document.getElementById("humidity");

const windSpeed =
document.getElementById("windSpeed");

const feelsLike =
document.getElementById("feelsLike");

const weatherIcon =
document.getElementById("weatherIcon");

const forecastContainer =
document.getElementById("forecastContainer");

async function getWeather(city){

    try{

        const weatherResponse =
        await fetch(

`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

        );

        if(!weatherResponse.ok){

            throw new Error(
                "City not found"
            );
        }

        const weatherData =
        await weatherResponse.json();

        updateCurrentWeather(
            weatherData
        );

        const forecastResponse =
        await fetch(

`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

        );

        const forecastData =
        await forecastResponse.json();

        updateForecast(
            forecastData
        );

    }

    catch(error){

        alert(
            error.message
        );
    }
}

function updateCurrentWeather(data){

    cityName.textContent =
    data.name;

    currentTemp.textContent =
    `${Math.round(data.main.temp)}°`;

    mainTemp.textContent =
    `${Math.round(data.main.temp)}°`;

    weatherDesc.textContent =
    data.weather[0].description;

    mainCondition.textContent =
    data.weather[0].main;

    humidity.textContent =
    `${data.main.humidity}%`;

    windSpeed.textContent =
    `${data.wind.speed} m/s`;

    feelsLike.textContent =
    `${Math.round(
        data.main.feels_like
    )}°`;

    const icon =
    data.weather[0].icon;

    weatherIcon.src =
`https://openweathermap.org/img/wn/${icon}@4x.png`;

    changeBackground(
        data.weather[0].main
    );
}

function updateForecast(data){

    forecastContainer.innerHTML =
    "";

    const dailyForecast =
    data.list.filter(
        item =>
        item.dt_txt.includes(
            "12:00:00"
        )
    );

    dailyForecast
    .slice(0,5)
    .forEach(day => {

        const date =
        new Date(day.dt_txt);

        const dayName =
        date.toLocaleDateString(
            "en-US",
            {
                weekday:"short"
            }
        );

        const card =
        document.createElement(
            "div"
        );

        card.classList.add(
            "forecast-card"
        );

        card.innerHTML = `

            <h4>
                ${dayName}
            </h4>

            <img
            src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

            <p>
                ${Math.round(
                    day.main.temp
                )}°
            </p>

            <p>
                ${day.weather[0].main}
            </p>

        `;

        forecastContainer
        .appendChild(card);
    });
}

function changeBackground(weather){

    const body =
    document.body;

    if(weather === "Clear"){

        body.style.backgroundImage =
        "url('images/clear weather.avif')";
    }

    else if(
        weather === "Clouds"
    ){

        body.style.backgroundImage =
        "url('images/cloudy weather.jpg')";
    }

    else if(
        weather === "Rain"
    ){

        body.style.backgroundImage =
        "url('images/rain weather.jpg')";
    }

    else if(
        weather === "Drizzle"
    ){

        body.style.backgroundImage =
        "url('images/rain weather.jpg')";
    }

    else if(
        weather ===
        "Thunderstorm"
    ){

        body.style.backgroundImage =
        "url('images/thunder weather.jpg')";
    }

    else if(
        weather === "Snow"
    ){

        body.style.backgroundImage =
        "url('images/snow weather.jpg')";
    }

    else{

        body.style.backgroundImage =
        "url('images/cloudy.avif')";
    }
}

searchBtn
.addEventListener(
    "click",
    () => {

        const city =
        cityInput.value.trim();

        if(city){

            getWeather(city);
        }
    }
);

cityInput
.addEventListener(
    "keypress",
    e => {

        if(
            e.key === "Enter"
        ){

            searchBtn.click();
        }
    }
);

getWeather("Chennai");