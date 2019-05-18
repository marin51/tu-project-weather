var weather = (function() {
    var OpenWeatherAppKey = "271e0eab66001b4207410ec33d7cf4f9";

    function showDailyForest(city) {
        if (json_cities.hasOwnProperty(city) && isActualForecast(json_cities[city])) {
            showWeatherData(json_cities[city]);
        } else {
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city +
                    ',BG&appid=' + OpenWeatherAppKey + '&units=metric',
                type: 'GET',

                success: function(results) {

                    showWeatherData(results);
                    // dfd.resolve('success');
                },
                error: function(error) {
                    // dfd.reject(error);
                }
            });
        }
    }

    function showWeatherData(results) {
        var html = '';
        debugger;

        $('.main-container #weather-data').html('');
        if (results.weather.length) {
            var sunriseDate = new Date(results.sys.sunrise * 1000),
                sunsetDate = new Date(results.sys.sunset * 1000);
            html += '<ons-list id="weather-data">';
            html += '<ons-list-header id="title">City ' + results.name + ' <img class="done-icon hide" src="../www/res/baseline-done-24px.svg" alt="" srcset=""></ons-list-header>';
            html += '<ons-list-item id="temperature">Temperature  ' + results.main.temp + ' degreess</ons-list-item>';
            html += '<ons-list-item id="wind-speed">Wind speed: ' + results.wind.speed + ' km/h</ons-list-item>';
            html += '<ons-list-item id="wind-direction">Wind direction: ' + genereteWindDirection(results.wind.deg) + '</ons-list-item>';
            html += '<ons-list-item id="humidity">Humidity: ' + results.main.humidity + ' %</ons-list-item>';
            html += '<ons-list-item id="visibility">Visibility: ' + results.weather[0].main + '</ons-list-item>';

            html += '<ons-list-item id="sunrise">Sunrise: ' + sunriseDate.toLocaleTimeString() + '</ons-list-item>';

            html += '<ons-list-item id="sunset">Sunset: ' + sunsetDate.toLocaleTimeString() + '</ons-list-item>';
            html += '</ons-list>';



            $('#home-page-template .main-container').append(html);
            $('.home-message').hide();
            $('#check-location-button').hide();

            $('#home-reset-button').show();
            $('#weather-data').show();


            saveDailyForecastCitiesLocally(results);
        } else {
            $('#weather-data').hide();
            $('.home-message').text("Error retrieving data. ");
        }
    }

    function isActualForecast(forecastDay) {
        var dateNow = new Date().toLocaleDateString();
        if (dateNow == new Date().toLocaleDateString(forecastDay)) {
            return true;
        } else {
            return false;
        }
    }


    function genereteWindDirection(degreess) {
        if (parseInt(degreess) === 0) { return 'North' };
        if (parseInt(degreess) === 90) { return 'East' };
        if (parseInt(degreess) === 180) { return 'South' };
        if (parseInt(degreess) === 270) { return 'North' }


        if (0 < degreess <= 45) {
            return 'NNE';
        } else if (45 < degreess <= 90) {
            return 'ENE';
        } else if (90 < degreess <= 135) {
            return 'ESE';
        } else if (135 < degreess <= 180) {
            return 'SSE';
        } else if (180 < degreess <= 225) {
            return 'SSW';
        } else if (225 < degreess <= 270) {
            return 'WSW';
        } else if (270 < degreess <= 315) {
            return 'WNW'
        } else {
            return 'NNW'
        }
    }


    return {
        showDailyForest: showDailyForest
    }
})();