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

    window['json_cities'] = JSON.parse(localStorage.getItem('my_project_saved_cities')) || {};
    if (!$.isEmptyObject(cityData)) {
        json_cities[cityData.name] = cityData;
        json_cities[cityData.name]['date'] = Date.now();
        localStorage.setItem('my_project_saved_cities', JSON.stringify(json_cities));
    }
}

function getDailyForecastCitesData() {
    window['json_cities'] = JSON.parse(localStorage.getItem('my_project_saved_cities')) || {};
}