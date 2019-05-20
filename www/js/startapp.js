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

            if (!$.isEmptyObject(json_cities)) {
                ons.notification.prompt({
                    title: 'Well...',
                    message: 'Please type your city to field below',

                }).then(function(typedCity) {
                    if (typedCity) {
                        city = typedCity;

                        weather.getDailyForecast(typedCity).then(function(results) {
                            saveDailyForecastCitiesLocally(results, city);
                            showWeatherData(results, city);
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
            } else {
                ons.notification.confirm({
                    title: 'Hello!',
                    message: "Are you from Sofia?",
                    buttonLabels: ['No', 'Yes'],
                }).then(function(btnIndex) {
                    if (btnIndex === 1) {
                        city = 'Sofia';
                        $('.progess-icon').addClass('hide');
                        weather.getDailyForecast(city).then(function(results) {
                            saveDailyForecastCitiesLocally(results, city);
                            showWeatherData(results, city);
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
                                    saveDailyForecastCitiesLocally(results, city);
                                    showWeatherData(results, city);
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
            }

        });


        if (typeof json_cities !== 'undefined') {
            for (const key in json_cities) {
                if (json_cities.hasOwnProperty(key)) {
                    const element = json_cities[key];
                    var buttonHTML = '<button class="button--cta list-city-buttns" onclick="startApp.showForecast(\'' + key + '\')">See forecast for ' + key + '</button>';
                    $('#home-page-template .main-container').append(buttonHTML);
                }
            }
        }


    }


    function showForecast(city) {
        weather.getDailyForecast(city).then(function(results) {
            saveDailyForecastCitiesLocally(results, city);
            showWeatherData(results, city);
        }, function(error) {
            $('#weather-data').hide();
            $('.home-message').text("Error retrieving data. ");
        });
    }



    function showWeatherData(results, city) {
        var html = '';
        if ($('.main-container #weather-data').length) {
            $('.main-container #weather-data').html('');
        } else {
            $('#home-page-template .main-container').append(ons.createElement('<ons-list id="weather-data"></ons-list>'))
        }

        if (results) {
            html += '<ons-list-header id="title">City ' + city + ' <img class="done-icon hide" src="../www/res/baseline-done-24px.svg" alt="" srcset=""></ons-list-header>';
            html += '<ons-list-item id="min-temp">Today minimum :' + results.DailyForecasts[0].Temperature.Minimum.Value + '°C</ons-list-item>';
            html += '<ons-list-item id="max-tem">Today maximum : ' + results.DailyForecasts[0].Temperature.Maximum.Value + '°C</ons-list-item>';
            html += '<ons-list-item id="wind-speed"> ' + results.Headline.Text + '</ons-list-item>';
            html += '<ons-list-item id="humidity">Precipitation Probability: ' + results.DailyForecasts[0].Day.PrecipitationProbability + ' %</ons-list-item>';
            html += '<ons-list-item id="visibility">Wind: ' + results.DailyForecasts[0].Day.Wind.Speed.Value + ' km/h</ons-list-item>';
            html += '<ons-list-item id="visibility">Cloud Cover: ' + results.DailyForecasts[0].Day.CloudCover + ' %</ons-list-item>';

            html += '<ons-list-item id="sunrise">Sunrise: ' + results.DailyForecasts[0].Sun.Rise.slice(0, -9) + '</ons-list-item>';
            html += '<ons-list-item id="sunset">Sunset: ' + results.DailyForecasts[0].Sun.Set.slice(0, -9) + '</ons-list-item>';
            html += '<ons-list-item id="sunrise">Moonrise: ' + results.DailyForecasts[0].Moon.Rise.slice(0, -9) + '</ons-list-item>';
            html += '<ons-list-item id="sunset">Moonset: ' + results.DailyForecasts[0].Moon.Set.slice(0, -9) + '</ons-list-item>';


            html += '<button onclick="startApp.reset()" class="button button--outline footer-button left">Reset</button>';
            html += '<button onclick="weeklyforecast.init(\'' + city + '\')" class="button button--outline footer-button right">5 days forecast</button>';



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
            $('#home-page-template .main-container .list-city-buttns').remove();
            $('#weather-data').hide();

            for (const key in json_cities) {
                if (json_cities.hasOwnProperty(key)) {
                    var buttonHTML = '<button class="button--cta list-city-buttns" onclick="startApp.showForecast(\'' + key + '\')">See forecast for ' + key + '</button>';
                    $(buttonHTML).insertAfter("#check-location-button");
                }
            }
        }
    }


    return {
        init: init,
        reset: reset,
        showForecast: showForecast
    }



}());