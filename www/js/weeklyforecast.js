var weeklyforecast = (function() {

    function init(city) {
        //get city data
        weather.getWeeklyForecast(city).then(function() {
            var cityData = json_weeklycities[city],
                headerHTML = '';
            //build content
            headerHTML += '<div class="card">';

            headerHTML += '<div id="coords">Coords: <div class="lat">' + cityData.city.coord.lat + '</div><div class="lon">' + cityData.city.coord.lon + '</div></div>';
            headerHTML += '<div id="population">Population: <div class="population">' + cityData.city.population + '</div></div>';

            headerHTML += '</div>';

            $($('#weekly-forecast')[0])[0].content.querySelector('#general-city-info').innerHTML = headerHTML;

            //controller
            function controller() {
                $('.weekly-forecast-page #title').text(cityData.city.name);
            }
            //display
            pushPage('weekly-forecast', '', controller);

        })





    }

    return { init: init }
})();