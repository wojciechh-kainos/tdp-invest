define(['angular', 'application/tdpInvestModule', 'application/services/tdpUserService', 'application/services/tdpBase64Service'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpAuthenticationService", function($http, $cookieStore, $rootScope, tdpUserService, Restangular, tdpBase64Service) {
        var userLoggedIn = false;


        var login = function(username, password) {
            return tdpUserService.login({username:username, password:password});
           };

        var setCredentials = function(username, password) {
            userLoggedIn = true;
            var authdata = tdpBase64Service.encode(username + ':' + password);

            var globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            var auth = 'Basic ' + authdata;
            Restangular.setDefaultHeaders({Authorization: auth});

            $cookieStore.put('globals', globals);
        };

        var clearCredentials = function() {

            userLoggedIn = false;
            $cookieStore.remove('globals');
            Restangular.setDefaultHeaders({});
        };

        var isUserLoggedIn = function() {
            return userLoggedIn;
        }

        this.isUserLoggedIn = isUserLoggedIn;
        this.login = login;
        this.setCredentials = setCredentials;
        this.clearCredentials = clearCredentials;

    });
});