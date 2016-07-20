define(['angular', 'uiRouter', 'ngCookies'], function(angular) {
    return angular.module("tdpInvestModule", ['ui.router', 'ngCookies'])
    .run(['$cookieStore', '$http', '$window',
        function ($cookieStore, $http, $window) {
            // keep user logged in after page refresh
            var user = $cookieStore.get('currentUser') || {};

            if(!user){ $window.location.href = "/auth"; }

            else {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + user.authdata; // jshint ignore:line
                $http.get('/api/login').then(undefined, function () { $window.location.href = "/auth"; });
            }

        }]);
});
