
define(['angular', 'uiRouter', 'ngCookies', 'highcharts-ng', 'highcharts'], function(angular) {
    return angular.module("tdpInvestModule", ['ui.router', 'ngCookies', 'highcharts-ng'])
    .run(['$cookieStore', '$http',
        function ($cookieStore, $http) {
            // keep user logged in after page refresh
            var user = $cookieStore.get('currentUser') || {};

            if (user) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + user.authdata; // jshint ignore:line
            }
        }]);
});

