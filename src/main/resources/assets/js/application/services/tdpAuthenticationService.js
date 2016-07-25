define(['angular', 'application/tdpInvestModule', 'application/services/tdpUserService', 'application/services/tdpBase64Service'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpAuthenticationService", function($state, $cookieStore, $rootScope, tdpUserService, Restangular, tdpBase64Service) {

        var currentUser = {};

        var login = function(username, password, errorCallback) {
            return tdpUserService.login({username:username, password:password});
        };

        var setCredentials = function(username, password) {
            var authdata = tdpBase64Service.encode(username + ':' + password);

            var globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            currentUser = {
                name: globals.currentUser.username
            };

            var auth = 'Basic ' + authdata;
            Restangular.setDefaultHeaders({Authorization: auth});

            $cookieStore.put('globals', globals);
        };

        var clearCredentials = function() {
            $cookieStore.remove('globals');
            currentUser = {};
            Restangular.setDefaultHeaders({});
        };

        var isUserLoggedIn = function() {
            return currentUser.name ? true : false;
        };

        var checkCookies = function() {
            var globals = $cookieStore.get('globals');
            if (globals) {
                currentUser = {
                    name: globals.currentUser.username
                };
            }
        };

        var getCurrentUser = function() {
            return currentUser;
        }

        this.checkCookies = checkCookies;
        this.getCurrentUser = getCurrentUser;
        this.isUserLoggedIn = isUserLoggedIn;
        this.login = login;
        this.setCredentials = setCredentials;
        this.clearCredentials = clearCredentials;

    });
});