var weather = (function() {
    var OpenWeatherAppKey = "271e0eab66001b4207410ec33d7cf4f9";

    function showDailyForest(city) {
        alert('city ' + city)
            // if (json_cities.hasOwnProperty(city) && isActualForecast(json_cities[city].date)) {
            // showWeatherData(json_cities[city]);
            // } else {
        var link = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',BG&appid=' + OpenWeatherAppKey + '&units=metric';
        alert(link)
        $.ajax({
            url: link,
            type: 'GET',

            success: function(results) {
                alert(JSON.stringify(results))
                saveDailyForecastCitiesLocally(results);
                showWeatherData(results);
                // dfd.resolve('success');
            },
            error: function(error) {
                alert(JSON.stringify(error))
                    // dfd.reject(error);
            }
        });
        // }
    }

    function getWeeklyForecast(city) {
        var dfd = jQuery.Deferred();
        getWeeklyForecastCitesData();
        if (json_weeklycities.hasOwnProperty(city) && isActualForecast(json_weeklycities[city].date)) {
            dfd.resolve('success');
        } else {
            //get forecast from server
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',BG&appid=' + OpenWeatherAppKey + '&units=metric',
                type: 'GET',

                success: function(results) {
                    saveWeeklyForecastCitiesLocally(results);
                    dfd.resolve('success');

                },
                error: function(error) {
                    dfd.reject(error);
                }
            });
        }
        return dfd.promise();
    }

    function showWeatherData(results) {
        var html = '';
        if ($('.main-container #weather-data').length) {
            $('.main-container #weather-data').html('');
        } else {
            $('#home-page-template .main-container').append(ons.createElement('<ons-list id="weather-data"></ons-list>'))
        }

        if (results.weather.length) {
            var sunriseDate = new Date(results.sys.sunrise * 1000),
                sunsetDate = new Date(results.sys.sunset * 1000);

            html += '<ons-list-header id="title">City ' + results.name + ' <img class="done-icon hide" src="../www/res/baseline-done-24px.svg" alt="" srcset=""></ons-list-header>';
            html += '<ons-list-item id="temperature">Temperature  ' + results.main.temp + '°C</ons-list-item>';
            html += '<ons-list-item id="min-temp">Today maximum :' + results.main.temp_min + '°C</ons-list-item>';
            html += '<ons-list-item id="max-tem">Today minimum : ' + results.main.temp_max + '°C</ons-list-item>';
            html += '<ons-list-item id="wind-speed">Wind speed: ' + results.wind.speed + ' km/h</ons-list-item>';
            html += '<ons-list-item id="humidity">Humidity: ' + results.main.humidity + ' %</ons-list-item>';
            html += '<ons-list-item id="visibility">Visibility: ' + results.weather[0].main + '</ons-list-item>';

            html += '<ons-list-item id="sunrise">Sunrise: ' + sunriseDate.toLocaleTimeString() + '</ons-list-item>';

            html += '<ons-list-item id="sunset">Sunset: ' + sunsetDate.toLocaleTimeString() + '</ons-list-item>';
            html += '<button onclick="startApp.reset()" class="button button--outline footer-button left">Reset</button>';
            html += '<button onclick="weeklyforecast.init(\'' + results.name + '\')" class="button button--outline footer-button right">5 days forecast</button>';



            $('#home-page-template .main-container #weather-data').append(html);
            $('.home-message').hide();
            $('#check-location-button').hide();

            $('#home-reset-button').show();
            $('#weather-data').show();

        } else {
            $('#weather-data').hide();
            $('.home-message').text("Error retrieving data. ");
            ons.notification.alert('Ooops! It seems there are an error. Please try again later.');
        }
    }

    return {
        showDailyForest: showDailyForest,
        getWeeklyForecast: getWeeklyForecast
    }
})();