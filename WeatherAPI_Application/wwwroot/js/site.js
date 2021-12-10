// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
let weather = {
    apikey: "b274567be2eb4830894114010211012",
    days: "1",
    localHour: 0,
    count: 0,
    isTrue :false,
    fetchWeather: function (city) {
        fetch("https://api.weatherapi.com/v1/current.json?key=" +
            this.apikey +
            "&q=" +
            city)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch(error => {
                console.error(error);
            });
    },

    fetchForeCast: function (city) {
        fetch("https://api.weatherapi.com/v1/forecast.json?key=" +
            this.apikey +
            "&q=" +
            city +
            "&days=" + this.days)
            .then((response) => response.json())
            .then((result) => this.displayForecast(result))
            .catch(error => {
                console.error(error);
            });
    },

    displayWeather: function (data) {        
        var locationValues = data.location;
        this.localHour = new Date(locationValues.localtime).getHours();

        document.querySelector(".name").innerText = "Name = " + locationValues.name;
        document.querySelector(".region").innerText = "Region = " + locationValues.region;
        document.querySelector(".country").innerText = "Country = " + locationValues.country;
        document.querySelector(".latitude").innerText = "latitude = " + locationValues.lat;
        document.querySelector(".longitude").innerText = "Longitude = " + locationValues.lon;
        document.querySelector(".timezone").innerText = "Timezone = " + locationValues.localtime_epoch;
        document.querySelector(".currenttime").innerText = "Current time = " + locationValues.localtime;
    },

    displayForecast: function (result) {
        var forecastHourValues = result.forecast.forecastday[0].hour;
        var forecastHourTimeValues = []; 
        var forecastCondtionValues = [];

        forecastHourValues.forEach(obj => {
            var hoursValue = new Date(obj.time).getHours();
            if (hoursValue >= this.localHour && this.count < 4) {
                forecastHourTimeValues.push(hoursValue + ":00");
                this.count++;
                this.isTrue = true;
            }
            if (this.count > 0 && this.count < 4 && this.isTrue) {
                forecastCondtionValues.push(obj.condition.text);
            }
            
            this.isTrue = false;
        });

        document.querySelector(".hour").innerText = forecastHourTimeValues;
        document.querySelector(".description").innerText = forecastCondtionValues;

        console.log(forecastHourTimeValues);
        console.log(forecastCondtionValues);        
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
        this.fetchForeCast(document.querySelector(".search-bar").value);
    }
};

function displayWeather() {
    weather.search();
    document.getElementById('display').style.display = 'block';
}

