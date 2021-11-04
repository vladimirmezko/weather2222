const input = document.querySelector('input');
const img = document.querySelector('img')
const time = document.querySelector('.time')
const termNow = document.querySelector("body > div > div.pog > div.deg")
const moreTemp = document.querySelector("body > div > div.pog > div.temp")
const wind = document.querySelector("body > div > div.pog > div.temp1")
const prec = document.querySelector("body > div > div.pole4 > div.precip")
const humidity = document.querySelector("body > div > div.pole4 > div:nth-child(6)")
const wind1 = document.querySelector("body > div > div.pole4 > div:nth-child(4)")
const sunset = document.querySelector("body > div > div.pole4 > div:nth-child(8)")

const city = document.querySelector("body > div > div.city")
const forecast = document.querySelector('.pol7')


function dayOfWeek(date){
    let day = new Date(date)
    return(day.toLocaleDateString('en-US', {weekday:'long'}));
}

function setTime() {
    let date = new Date()
    time.innerHTML = date.toLocaleTimeString('en-UK')
}

setInterval(setTime, 1000);

input.addEventListener('keyup', (e)=>{
    if (e.key == 'Enter') {
        getWeather(input.value)
    }
})

async function getWeather(city) {
    const url =`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=bf9d673488df4611ad6162034212710&q=${city}&num_of_days=5&format=json`;
    const res = await fetch(url);
    const data = await res.json(); 
    render(data.data)
}

function render(data) {
    console.log(data);
    img.src = `./img/${data.current_condition[0].weatherCode}.png`
    termNow.innerHTML = data.current_condition[0].temp_C + '°C'
    moreTemp.innerHTML = `${data.weather[0].maxtempC}°/${data.weather[0].mintempC}° | Feels like ${data.current_condition[0].FeelsLikeC}°C`
    wind.innerHTML = `Wind ${data.current_condition[0].windspeedKmph} KM/H ${data.current_condition[0].winddir16Point}`
    prec.innerHTML = `Cloudy ${data.current_condition[0].cloudcover} %`
    humidity.innerHTML = `Humidity ${data.weather[0].hourly[4].humidity} %`
    wind1.innerHTML = `Wind ${data.current_condition[0].windspeedKmph} KM/H`
    sunset.innerHTML = `Sunset ${data.weather[4].astronomy[0].sunset}`
    city.innerHTML = `${data.request[0].query}`
    for (let i = 1; i < 5; i++) {
        forecast.childNodes[8*i+1].innerHTML = dayOfWeek(data.weather[i].date)
        forecast.childNodes[8*i+3].childNodes[0].src = `./img/${data.weather[i].hourly[4].weatherCode}.png`  
        forecast.childNodes[8*i+5].innerHTML = `${data.weather[i].maxtempC}°`
        forecast.childNodes[8*i+7].innerHTML = `${data.weather[i].mintempC}°`
        console.log(forecast.childNodes);
    }
    dayOfWeek(data.weather[0].date)
    console.log(forecast.childNodes);
    
}


getWeather('Minsk')