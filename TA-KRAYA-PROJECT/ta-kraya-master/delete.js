'use strict';

const apikey = '46f80a02ecae410460d59960ded6e1c6';
const weatherForm = document.querySelector('form');
const inputValue = document.querySelector('#city-input');
const weatherData = document.querySelector('#weather-data');

function inputValueFetcher() {
  return inputValue.value;
}

function inputFetcher() {
  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherFetcher(inputValueFetcher());
  });
}

async function weatherFetcher(cityInputValue) {
  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apikey}&units=metric`;
  const response = await fetch(url);
  if(response.status >= 400) {
    console.log("ERROR");
  }
  const data = await response.json();
  await weatherDataSetter(data);
}

async function weatherDataSetter(data) {
  const icon = data.weather[0].icon;
  const weatherDesc = data.main;

  const img = `<img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">`;
  const feelsLike = elementCreater();
  const humidity = elementCreater();
  const windSpeed = elementCreater();

  feelsLike.innerHTML = `Feels like: ${weatherDesc.feels_like}&#8451;`;
  humidity.innerHTML = `Humdity: ${weatherDesc.humidity}%`;
  windSpeed.innerHTML = `Wind speed: ${data.wind.speed} m/s`;

  weatherData.querySelector(".icon").innerHTML = img;
  weatherData.querySelector(".details").innerHTML = '';
  weatherData.querySelector(".details").appendChild(feelsLike);
  weatherData.querySelector(".details").appendChild(humidity);
  weatherData.querySelector(".details").appendChild(windSpeed);
}

function elementCreater() {
  return document.createElement("div");
}

function init() {
  inputFetcher();
}

document.addEventListener('DOMContentLoaded', init);


