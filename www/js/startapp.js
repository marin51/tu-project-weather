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
                    weather.showDailyForest(city);
                    console.log('save');
                } else {
                    ons.notification.prompt({
                        title: 'Well...',
                        message: 'Please type your city to field below',

                    }).then(function(typedCity) {
                        if (typedCity) {
                            city = typedCity;

                            weather.showDailyForest(typedCity);
                            $('.progess-icon').addClass('hide');
                            console.log(city);
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
                    var buttonHTML = '<button class="button--cta" onclick="weather.showDailyForest(\'' + json_cities[key].name + '\')">See forecast for ' + json_cities[key].name + '</button>';
                    $('#home-page-template .main-container').append(buttonHTML);
                }
            }
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