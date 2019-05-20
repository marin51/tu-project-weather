var weeklyforecast = (function() {

    function init(city) {
        //get city data
        weather.getWeeklyForecast(city).then(function(success) {
            var cityData = json_weeklycities[city].DailyForecasts,
                headerHTML = '',
                listItemHTML = '';
            //build content
            // headerHTML += '<div class="card">';
            // headerHTML += '<div id="country">Country: <div class="country">' + 'Bulgaria' + '</div></div>';
            // headerHTML += '<div id="population">Population: <div class="population">' + cityData.city.population + '</div></div>';
            // headerHTML += '<div id="coords">Coords: <div class="lat"> lat: ' + cityData.city.coord.lat + '</div><div class="lon"> lon: ' + cityData.city.coord.lon + '</div></div>';
            // headerHTML += '</div>';


            $($('#weekly-forecast')[0])[0].content.querySelector('#general-city-info').innerHTML = headerHTML;







            $($('#weekly-forecast')[0])[0].content.querySelector('#five-day-forecast').innerHTML = generateForecastHTML(city);

            //controller
            function controller() {
                $('.weekly-forecast-page #title').text(city);



            }
            //display
            pushPage('weekly-forecast', '', controller);

        }, function(error) {
            ons.notification.alert('Ooops! It seems there are an error. Please try again later.');
        })

    }


    function generateForecastHTML(city) {
        var html = '',
            // isdaytimeBool = isDaytime(json_weather.weatherData.DailyForecasts[0].Sun.Rise, json_weather.weatherData.DailyForecasts[0].Sun.Set, json_weather.cityData.TimeZone.Name),
            forecastLength = json_weeklycities[city].DailyForecasts.length,
            forecastData = json_weeklycities[city].DailyForecasts;



        for (let dailyCast = 0; dailyCast < forecastLength; dailyCast++) {

            html += '<div class="card">';
            html += '<div class="weather-title"> ' + forecastData[dailyCast].Date.slice(0, -9) + '</div>';

            html += '<div class="weather-description"> ' + forecastData[dailyCast].Day.LongPhrase + '.</div>';
            html += '<div class="weather-item">Today minimum :' + forecastData[dailyCast].Temperature.Minimum.Value + '°C</div>';
            html += '<div class="weather-item">Today maximum : ' + forecastData[dailyCast].Temperature.Maximum.Value + '°C</div>';
            html += '<div class="weather-item">Precipitation Probability: ' + forecastData[dailyCast].Day.PrecipitationProbability + ' %</div>';
            html += '<div class="weather-item">Wind: ' + forecastData[dailyCast].Day.Wind.Speed.Value + ' km/h</div>';
            html += '<div class="weather-item">Cloud Cover: ' + forecastData[dailyCast].Day.CloudCover + ' %</div>';
            html += '<div class="weather-item">Cloud Cover: ' + forecastData[dailyCast].Day.CloudCover + ' %</div>';
            html += '</div>';
        }


        return html;
    }

    return { init: init }
})();