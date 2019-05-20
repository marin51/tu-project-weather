var weatherAPI = (function() {

    // // Test
    // window.json_weather = {};

    // $.ajax({
    //     url: 'services/weatherData.json',
    //     type: 'GET',
    //     success: function(result) {
    //         console.log(result);
    //         window.json_weather = {
    //             weatherData: result.forecast,
    //             cityData: result.city,
    //             showDailyForecast: true,
    //             showDetailedInfo: true
    //         };
    //     },
    //     error: function(error) {
    //         console.log(error);
    //     }
    // });



    // Awgt8BkT8xg5iAnCQ8ciLG4tYAJwsKIG
    var weatherAPIKey = 'Awgt8BkT8xg5iAnCQ8ciLG4tYAJwsKIG';
    var weatherAPIUrls = {
        // Coty:
        searchCity: 'http://dataservice.accuweather.com/locations/v1',

        // Conditions
        currentConditions: 'http://dataservice.accuweather.com/currentconditions/v1/',
        // Forecast:
        forecast: 'http://dataservice.accuweather.com/forecasts/v1',
        // Translations
        allLanguages: 'http://dataservice.accuweather.com/translations/v1/languages'
    };

    function changeWeatherAPIKey(newKey) {
        if (typeof newKey == 'string' && newKey.length >= 10) {
            weatherAPIKey = newKey;
        }
    }

    /*
        ******************************************************
        Current conditions:
    */

    function currentConditions(cityKey, fullInfo = false) {
        var dfd = jQuery.Deferred();


        $.ajax({
            url: weatherAPIUrls.currentConditions + cityKey + "?apikey=" + weatherAPIKey + ((fullInfo) ? '&details=true' : ''),
            type: 'GET',
            success: function(result) {
                dfd.resolve(result);
            },
            error: function(error) {
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }

    function historicalCurrentConditions(cityKey, hours = 6, fullInfo = true) {
        var dfd = jQuery.Deferred();


        $.ajax({
            url: weatherAPIUrls.currentConditions + cityKey + '/historical/' + hours + "?apikey=" + weatherAPIKey + ((fullInfo) ? '&details=true' : ''),
            type: 'GET',
            success: function(result) {
                dfd.resolve(result);
            },
            error: function(error) {
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }

    /*
        ******************************************************
        Forecast:
    */

    function dailyForecasts(cityKey, days = 5, metric = true, fullInfo = true) {
        var dfd = jQuery.Deferred(),
            daysParam = (days == 1) ? '1day' : (days == 5) ? '5day' : (days == 10) ? '10day' : (days == 15) ? '15day' : '5day';



        $.ajax({
            url: weatherAPIUrls.forecast + /daily/ + daysParam + '/' + cityKey + "?apikey=" + weatherAPIKey + ((fullInfo) ? '&details=true' : '') + ((metric) ? '&metric=true' : ''),
            type: 'GET',
            success: function(result) {
                dfd.resolve(result);
            },
            error: function(error) {
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }

    function hourlyForecasts(cityKey, hours = 12, metric = true, fullInfo = true) {
        var dfd = jQuery.Deferred(),
            hoursParam = (hours == 1) ? '1hour' : (hours == 12) ? '12hour' : (hours == 24) ? '24hour' : (hours == 72) ? '72hour' : (hours == 120) ? '120hour' : '12hour';


        $.ajax({
            url: weatherAPIUrls.forecast + /hourly/ + hoursParam + '/' + cityKey + "?apikey=" + weatherAPIKey + ((fullInfo) ? '&details=true' : '') + ((metric) ? '&metric=true' : ''),
            type: 'GET',
            success: function(result) {
                dfd.resolve(result);
            },
            error: function(error) {
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }

    /*
        ******************************************************
        Cities:
    */

    function searchCityByName(cityName) {
        var dfd = jQuery.Deferred();



        $.ajax({
            url: weatherAPIUrls.searchCity + '/cities/search?' + "apikey=" + weatherAPIKey + "&q=" + cityName,
            type: 'GET',
            success: function(result) {
                dfd.resolve(result);
            },
            error: function(error) {
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }

    function searchCityByNameAutoComplete(cityName) {
        var dfd = jQuery.Deferred();


        $.ajax({
            url: weatherAPIUrls.searchCity + '/cities/autocomplete?' + "apikey=" + weatherAPIKey + "&q=" + cityName,
            type: 'GET',
            success: function(result) {
                dfd.resolve(result);
            },
            error: function(error) {
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }

    function searchCityByKey(cityKey) {
        var dfd = jQuery.Deferred();


        $.ajax({
            url: weatherAPIUrls.searchCity + '/' + cityKey + "?apikey=" + weatherAPIKey,
            type: 'GET',
            success: function(result) {
                dfd.resolve(result);
            },
            error: function(error) {
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }

    function searchCityByGeoposition(latitude, longitude) {
        var dfd = jQuery.Deferred();


        $.ajax({
            url: weatherAPIUrls.searchCity + '/cities/geoposition/search?' + "apikey=" + weatherAPIKey + "&q=" + latitude + ',' + longitude,
            type: 'GET',
            success: function(result) {
                dfd.resolve(result);
            },
            error: function(error) {
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }

    /*
        ******************************************************
        Translations:
    */

    function getAllLanguages() {
        var dfd = jQuery.Deferred();


        $.ajax({
            url: weatherAPIUrls.allLanguages + "?apikey=" + weatherAPIKey,
            type: 'GET',
            success: function(result) {
                dfd.resolve(result);
            },
            error: function(error) {
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }

    function runWeatherDev() {

        $.ajax({
            url: 'features/weatherData.json',
            type: 'GET',
            success: function(result) {
                window.json_weather = {
                    title: 'My Weather Page', // String
                    showDetailedInfo: true, // Bool | false or true
                    showDailyForecast: true, // Bool | false or true
                    cityData: {}, // Object
                    weatherData: {} // Object
                };
                window.json_weather.weatherData = result.forecast;
                window.json_weather.cityData = result.city;
                weather.init();
            },
            error: function(error) {}
        });

    }

    return {
        changeKey: changeWeatherAPIKey,
        // City:
        searchCityByName: searchCityByName,
        searchCityByNameAutoComplete: searchCityByNameAutoComplete,
        searchCityByKey: searchCityByKey,
        searchCityByGeoposition: searchCityByGeoposition,
        // Conditions:
        currentConditions: currentConditions,
        historicalCurrentConditions: historicalCurrentConditions,
        // Forecast:
        dailyForecasts: dailyForecasts,
        hourlyForecasts: hourlyForecasts,
        // Languages:
        getAllLanguages: getAllLanguages,
        runDev: runWeatherDev
    }
})();