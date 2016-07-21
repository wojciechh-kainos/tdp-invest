define(['angular', 'uiRouter', 'ngCookies', 'highcharts-ng', 'ui-bootstrap'], function(angular) {
    return angular.module("tdpInvestModule", ['ui.router', 'ngCookies', 'highcharts-ng', 'ui.bootstrap'])
    .run(['$cookieStore', '$http',
        function ($cookieStore, $http) {
            // keep user logged in after page refresh
            var user = $cookieStore.get('currentUser') || {};

            if (user) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + user.authdata; // jshint ignore:line
            }
        }]);
});
