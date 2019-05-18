// load page and clear the stack(all states);
var loadPage = function(pageId, animation, controller) {
    var appMenu = document.getElementById('menu');
    var appNavigator = document.getElementById('myNavigator');
    var anim = 'fade-ios';
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
    var appNavigator = document.getElementById('myNavigator');
    var pageAnimation = 'slide-ios';
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
    var appMenu = document.getElementById('menu');
    appMenu.open();
};
var popPage = function() {
    var appNavigator = document.getElementById('myNavigator');
    // Pop page

    myNavigator.popPage({
        callback: function() {
            console.log('Pop page...');
        }
    })
};


function saveDailyForecastCitiesLocally(cityData = {}) {
    window['json_cities'] = JSON.parse(localStorage.getItem('TU_poject_dailycities')) || {};
    if (!$.isEmptyObject(cityData)) {
        json_cities[cityData.name] = cityData;
        json_cities[cityData.name]['date'] = Date.now();
        localStorage.setItem('TU_poject_dailycities', JSON.stringify(json_cities));
    }
}

function getDailyForecastCitesData() {
    window['json_cities'] = JSON.parse(localStorage.getItem('TU_poject_dailycities')) || {};
    return window['json_cities'];
}

function saveWeeklyForecastCitiesLocally(cityData = {}) {
    window['json_weeklycities'] = JSON.parse(localStorage.getItem('TU_project_weeklycities')) || {};

    if (!$.isEmptyObject(cityData)) {
        json_weeklycities[cityData.city.name] = cityData;
        json_weeklycities[cityData.city.name]['date'] = Date.now();
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
    var dateNow = new Date().toLocaleDateString();

    if (dateNow == new Date().toLocaleDateString(forecastDay)) {
        return true;
    } else {
        return false;
    }
}