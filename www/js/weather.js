var weather = (function() {


    function getDailyForecast(city) {
        var dfd = jQuery.Deferred();

        if (json_cities.hasOwnProperty(city) && isActualForecast(json_cities[city].DailyForecasts[0].Date)) {
            dfd.resolve(json_cities[city])
        } else {
            weatherAPI.searchCityByName(city).then(function(citykeys) {
                var cityId = '';
                for (const city in citykeys) {
                    if (citykeys.hasOwnProperty(city)) {
                        const singleCity = citykeys[city];

                        if (singleCity.Country.EnglishName === "Bulgaria") {
                            cityId = singleCity.Key;
                        }

                    }
                }
                weatherAPI.dailyForecasts(cityId, 1, true, true).then(function(success) {
                    dfd.resolve(success);
                }, function(error) {
                    dfd.reject(error);
                    alert('error in weather dailyforecasts');
                    alert(JSON.stringify(error));
                });
            }, function(erorr) {
                alert('error in weather search city by name');
                alert(JSON.stringify(erorr));
                dfd.reject(erorr);
            })
        }


        // }
        return dfd.promise();
    }

    function getWeeklyForecast(city) {
        var dfd = jQuery.Deferred();
        getWeeklyForecastCitesData();
        if (json_weeklycities.hasOwnProperty(city) && isActualForecast(json_weeklycities[city].date)) {
            dfd.resolve('success');
        } else {
            weatherAPI.searchCityByName(city).then(function(citykeys) {
                var cityId = '';
                for (const city in citykeys) {
                    if (citykeys.hasOwnProperty(city)) {
                        const singleCity = citykeys[city];

                        if (singleCity.Country.EnglishName === "Bulgaria") {
                            cityId = singleCity.Key;
                        }
                    }
                }
                weatherAPI.dailyForecasts(cityId, 5, true, true).then(function(success) {
                    saveWeeklyForecastCitiesLocally(success, city);
                    dfd.resolve(success);
                }, function(error) {
                    dfd.reject(error);
                });
            }, function(erorr) {
                dfd.reject(erorr);
            })
        }
        return dfd.promise();
    }
    return {
        getDailyForecast: getDailyForecast,
        getWeeklyForecast: getWeeklyForecast
    }
})();