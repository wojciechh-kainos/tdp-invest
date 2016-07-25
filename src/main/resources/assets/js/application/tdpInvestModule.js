define(['angular', 'chart-config', 'highcharts-ng', 'uiRouter', 'ngFileUpload', 'ng-table', 'ngCookies', 'xeditable'], function(angular) {
    return angular.module("tdpInvestModule", ['highcharts-ng', 'ui.router', 'ngFileUpload', 'ngTable', 'ngCookies', 'xeditable']);
    // .run(['$rootScope', '$location', '$cookieStore', '$http',
    //     function ($rootScope, $location, $cookieStore, $http) {
    //         // keep user logged in after page refresh
    //         $rootScope.globals = $cookieStore.get('globals') || {};
    //         if ($rootScope.globals.currentUser) {
    //             $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    //         }
    //     }]);
});
