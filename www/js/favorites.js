var favorites = (function() {

    function init() {
        if (typeof json_cities === 'undefined') {
            getDailyForecastCitesData();
        }
        $($('#favorites')[0])[0].content.querySelector('#city-list').innerHTML = '';

        if (!$.isEmptyObject(json_cities)) {
            for (const city in json_cities) {
                if (json_cities.hasOwnProperty(city)) {
                    const element = json_cities[city];
                    console.log(element);
                    $($('#favorites')[0])[0].content.querySelector('#city-list').append(ons.createElement(buildListItem(element)));

                }
            }
        } else {
            //show empty state
            $($('#favorites')[0])[0].content.querySelector('.main-container').innerHTML = 'nema nikoi';
        }


        loadPage('favorites', '', favoritesController);

        function buildListItem(city) {
            var html = '<ons-list-item>';
            html += '<div class="left"><div class="city-temperature">' + city.main.temp + '°C </div></div>';
            html += '<div class="center">' + city.weather[0].main + ' in ' + city.name + '</div></div></div>';
            html += '</ons-list-item>';

            return html;


        }

        function favoritesController() {

        }
    }

    return { init: init }
})();