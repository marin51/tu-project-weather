var favorites = (function() {

    function init() {
        if (typeof json_cities === 'undefined') {
            getDailyForecastCitesData();
        }
        $($('#favorites')[0])[0].content.querySelector('#city-list').innerHTML = '';
        $($('#favorites')[0])[0].content.querySelector('#city-list').append(ons.createElement('<ons-list-header>My favorites</ons-list-header>'));
        if (!$.isEmptyObject(json_cities)) {
            for (const city in json_cities) {
                if (json_cities.hasOwnProperty(city)) {
                    const element = json_cities[city];
                    $($('#favorites')[0])[0].content.querySelector('#city-list').append(ons.createElement(buildListItem(element)));

                }
            }
        } else {
            //todo show empty state
            // $($('#favorites')[0])[0].content.querySelector('.main-container').innerHTML = 'nema nikoi';
        }


        loadPage('favorites', '', favoritesController);

        function buildListItem(city) {
            var html = '<ons-list-item id="favorite-city-' + city.name + '">';
            html += '<div onclick="weeklyforecast.init(\'' + city.name + '\')" class="center"><div class="city-temperature">Now: ' + city.weather[0].main + ' ' + city.main.temp + '°C </div></div>';
            html += '<div onclick="weeklyforecast.init(\'' + city.name + '\')" class="left"><div class="city-icon"><h5>' + city.name + '</h5></div></div></div></div>';
            html += '<div class="right"><div id="remove-from-favorites" onclick="favorites.remove(\'' + city.name + '\')">x</div></div></div></div>';
            html += '</ons-list-item>';

            return html;


        }

        function favoritesController() {
            if (!$('#city-list ons-list-item').length) {
                $('#city-list').remove();
                $('.main-container').append('<div class="empty-favorites">There are no favorites!</div>')
            }
        }
    }

    function remove(city) {
        var daily = getDailyForecastCitesData(),
            weekly = getWeeklyForecastCitesData();
        console.log('daily', daily);
        console.log('weekly', weekly);
        $('#favorite-city-' + city).remove();

        if (!$('#city-list ons-list-item').length) {
            $('#city-list').remove();
            $('.main-container').append('<div class="empty-favorites">There are no favorites!</div>')
        }

        if (daily.hasOwnProperty(city)) {
            delete daily[city];
            console.log(daily);
            if ($.isEmptyObject(daily)) {
                localStorage.removeItem('TU_poject_dailycities');
            } else {
                saveDailyForecastCitiesLocally(daily);
            }
        }

        if (weekly.hasOwnProperty(city)) {
            delete weekly[city];
            console.log(weekly);
            if ($.isEmptyObject(weekly)) {
                localStorage.removeItem('TU_project_weeklycities');
            } else {
                saveWeeklyForecastCitiesLocally(weekly);
            }
        }

    }

    return {
        init: init,
        remove: remove
    }
})();