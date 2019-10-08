// load page and clear the stack(all states);
var loadPage = function(pageId, animation, controller) {
    let appMenu = document.getElementById('menu'),
        appNavigator = document.getElementById('myNavigator'),
        anim = 'fade-ios';
    if (animation !== '') {
        anim = animation;
    }

    appMenu.close();
    appNavigator.resetToPage(pageId, {
        animation: anim,
        animationOptions: {
            duration: 0.2,
            delay: 0,
            timing: 'ease-in'
        },
        callback: controller,
        data: {
            moduleHash: pageId
        }
    });
};

var pushPage = function(page, anim, callbackFunction) {
    let appNavigator = document.getElementById('myNavigator'),
        pageAnimation = 'slide-ios';
    if (anim === '') {
        pageAnimation = 'slide-ios';
    } else { pageAnimation = anim }

    appNavigator.pushPage(page, {
        animation: pageAnimation,
        callback: callbackFunction,
        data: {
            moduleHash: page
        }
    });
};
var openMenu = function() {
    let appMenu = document.getElementById('menu');
    appMenu.open();
};
var popPage = function() {
    let appNavigator = document.getElementById('myNavigator');
    // Pop page

    appNavigator.popPage({
        callback: function() {
            console.log('Pop page...');
        }
    })
};


function saveDailyForecastCitiesLocally(cityData = {}, city) {
    window['json_cities'] = JSON.parse(localStorage.getItem('TU_poject_dailycities')) || {};
    if (!$.isEmptyObject(cityData)) {
        json_cities[city] = cityData;
        localStorage.setItem('TU_poject_dailycities', JSON.stringify(json_cities));
    }
}

function getDailyForecastCitesData() {
    window['json_cities'] = JSON.parse(localStorage.getItem('TU_poject_dailycities')) || {};
    return window['json_cities'];
}

function saveWeeklyForecastCitiesLocally(cityData = {}, city) {
    window['json_weeklycities'] = JSON.parse(localStorage.getItem('TU_project_weeklycities')) || {};

    if (!$.isEmptyObject(cityData)) {
        json_weeklycities[city] = cityData;
        localStorage.setItem('TU_project_weeklycities', JSON.stringify(json_weeklycities));
    }
}

function getWeeklyForecastCitesData() {
    window['json_weeklycities'] = JSON.parse(localStorage.getItem('TU_project_weeklycities')) || {};
    return window['json_weeklycities'];
}



function genereteWindDirection(degreess) {
    console.log(degreess);
    if (parseInt(degreess) === 0) { return 'North' };
    if (parseInt(degreess) === 90) { return 'East' };
    if (parseInt(degreess) === 180) { return 'South' };
    if (parseInt(degreess) === 270) { return 'North' }


    if (0 < degreess && degreess < 45) {
        return 'NNE';
    } else if (45 < degreess && degreess < 90) {
        return 'ENE';
    } else if (90 < degreess && degreess < 135) {
        return 'ESE';
    } else if (135 < degreess && degreess < 180) {
        return 'SSE';
    } else if (180 < degreess && degreess < 225) {
        return 'SSW';
    } else if (225 < degreess && degreess < 270) {
        return 'WSW';
    } else if (270 < degreess && degreess < 315) {
        return 'WNW'
    } else {
        return 'NNW'
    }
}


function isActualForecast(forecastDay) {
    return (new Date().getDate() == new Date(forecastDay) ? true : false)
}