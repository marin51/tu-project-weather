var weather = (function() {
    var OpenWeatherAppKey = "271e0eab66001b4207410ec33d7cf4f9";

    function getDailyForecast(city) {
        alert('city ' + city)
        var dfd = jQuery.Deferred();
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
                dfd.resolve(results);
            },
            error: function(error) {
                alert(JSON.stringify(error))
                dfd.reject(error);
            }
        });
        // }
        return dfd.promise();
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
    return {
        getDailyForecast: getDailyForecast,
        getWeeklyForecast: getWeeklyForecast
    }
})();