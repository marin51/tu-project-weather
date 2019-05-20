var startApp = (function() {
    var city = '';

    function init() {
        getDailyForecastCitesData();
        loadPage('home', '', controller);
    }

    function controller() {
        loading.hide();
        //reset button
        if ($('#weather-data').length) {
            $('#home-reset-button').show();
        } else {
            $('#home-reset-button').hide();
        }

        //select city logic
        $('#check-location-button').on('click', function() {
            $('.fail-icon').addClass('hide');
            $('.progess-icon').removeClass('hide');
            ons.notification.confirm({
                title: 'Hello!',
                message: "Are you from Sofia?",
                buttonLabels: ['No', 'Yes'],
            }).then(function(btnIndex) {
                if (btnIndex === 1) {
                    city = 'Sofia';
                    $('.progess-icon').addClass('hide');
                    weather.getDailyForecast(city).then(function(results) {
                        saveDailyForecastCitiesLocally(results);
                        showWeatherData(results);
                    }, function(error) {
                        $('#weather-data').hide();
                        $('.home-message').text("Error retrieving data. ");
                    });
                    console.log('save');
                } else {
                    ons.notification.prompt({
                        title: 'Well...',
                        message: 'Please type your city to field below',

                    }).then(function(typedCity) {
                        if (typedCity) {
                            city = typedCity;

                            weather.getDailyForecast(typedCity).then(function(results) {
                                saveDailyForecastCitiesLocally(results);
                                showWeatherData(results);
                            }, function(error) {
                                $('#weather-data').hide();
                                $('.home-message').text("Error retrieving data. ");
                            });
                            $('.progess-icon').addClass('hide');

                        } else {
                            $('.progess-icon').addClass('hide');
                            $('.fail-icon').removeClass('hide');
                        }
                    });
                }
            });
        });


        if (typeof json_cities !== 'undefined') {
            for (const key in json_cities) {
                if (json_cities.hasOwnProperty(key)) {
                    const element = json_cities[key];
                    var buttonHTML = '<button class="button--cta" onclick="weather.getDailyForecast(\'' + json_cities[key].name + '\')">See forecast for ' + json_cities[key].name + '</button>';
                    $('#home-page-template .main-container').append(buttonHTML);
                }
            }
        }


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

    function reset() {
        if ($('#weather-data').length) {
            $('.home-message').show();
            $('#check-location-button').show();

            $('#weather-data').hide();
        }
    }


    return {
        init: init,
        reset: reset
    }



}());