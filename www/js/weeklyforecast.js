var weeklyforecast = (function() {

    function init(city) {
        //get city data
        weather.getWeeklyForecast(city).then(function(success) {
            var cityData = json_weeklycities[city],
                headerHTML = '',
                listItemHTML = '';
            //build content
            headerHTML += '<div class="card">';
            headerHTML += '<div id="country">Country: <div class="country">' + cityData.city.country + '</div></div>';
            headerHTML += '<div id="population">Population: <div class="population">' + cityData.city.population + '</div></div>';
            headerHTML += '<div id="coords">Coords: <div class="lat"> lat: ' + cityData.city.coord.lat + '</div><div class="lon"> lon: ' + cityData.city.coord.lon + '</div></div>';
            headerHTML += '</div>';


            $($('#weekly-forecast')[0])[0].content.querySelector('#general-city-info').innerHTML = headerHTML;


            for (const forecast in cityData.list) {
                if (cityData.list.hasOwnProperty(forecast)) {
                    const element = cityData.list[forecast];
                    console.log('element', element);
                    var time = element.dt_txt.slice(0, -3).split(' '),
                        date = element.dt_txt.slice(0, -9).split('-');

                    listItemHTML += '<ons-list-item>';
                    //time and main info
                    listItemHTML += '<div class="left"><div class="heading">' + date[2] + '/' + date[1] + '<div>' +
                        time[1] + 'h</div></div></div>';
                    //degreees
                    listItemHTML += '<div class="center"><div class="weater-info-long">' + element.weather[0].description + '</div><div class="temp-min">' + element.main.temp + '°C</div></div>';
                    //wind and
                    listItemHTML += '<div class="right"><div class="wind-speed">Wind:' + element.wind.speed + ' km/h <br>' + genereteWindDirection(element.wind.deg) + '</div></div>';

                    listItemHTML += '</ons-list-item>';
                }
            }

            $($('#weekly-forecast')[0])[0].content.querySelector('#five-day-forecast').innerHTML = listItemHTML;

            //controller
            function controller() {
                $('.weekly-forecast-page #title').text(cityData.city.name);
            }
            //display
            pushPage('weekly-forecast', '', controller);

        }, function(error) {
            ons.notification.alert('Ooops! It seems there are an error. Please try again later.');
        })





    }

    return { init: init }
})();