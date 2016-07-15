define(['angular', 'uiRouter', 'ngCookies', 'highcharts-ng', 'ui-bootstrap'], function(angular) {
    return angular.module("tdpInvestModule", ['ui.router', 'ngCookies', 'highcharts-ng', 'ui.bootstrap'])
    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }
        }]);
});

