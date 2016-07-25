define(['angular', 'uiRouter', 'ngCookies', 'highcharts-ng', 'ui-bootstrap', 'angular-moment', 'angular-file-upload'], function(angular) {
    return angular.module("tdpInvestModule", ['ui.router', 'ngCookies', 'highcharts-ng', 'ui.bootstrap', 'angularMoment', 'angularFileUpload'])
    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            var user = $cookieStore.get('currentUser') || {};

            if (user) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + user.authdata; // jshint ignore:line
            }
        }])
        .constant('moment', require('moment-timezone'));
});

