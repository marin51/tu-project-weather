var startApp = (function() {

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
            $('.progess-icon').removeClass('hide');
            if ($.isEmptyObject(json_cities)) {
                ons.notification.confirm({
                    title: 'Hello!',
                    message: "Are you from Sofia?",
                    buttonLabels: ['No', 'Yes'],
                }).then(function(btnIndex) {
                    if (btnIndex === 1) {
                        $('.progess-icon').addClass('hide');
                        weather.showDailyForest('Sofia');
                        console.log('save');
                    } else {
                        ons.notification.prompt({
                            title: 'Well...',
                            message: 'Please type your city to field below',

                        }).then(function(typedCity) {
                            if (typedCity) {
                                weather.showDailyForest(typedCity);
                                $('.progess-icon').addClass('hide');
                                console.log(city);
                            } else {
                                $('.progess-icon').addClass('hide');
                                $('#home-message').text('It seems you have not select city yet.');
                            }
                        });
                    }
                });
            } else {
                ons.notification.prompt({
                    title: 'Well...',
                    message: 'Please type your city to field below',
                }).then(function(typedCity) {
                    if (typedCity) {
                        weather.showDailyForest(typedCity);
                        $('.progess-icon').addClass('hide');
                    } else {
                        $('.progess-icon').addClass('hide');
                        $('#home-message').text('It seems you have not select city yet.');
                    }
                });
            }

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
        $('.home-message').show();
        $('#check-location-button').show();
        $('#weather-data').hide();
        $('#home-reset-button').hide();

    }

    return {
        init: init,
        reset: reset
    }



}());