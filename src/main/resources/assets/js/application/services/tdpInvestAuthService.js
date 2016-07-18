define(['angular','application/tdpInvestModule', 'application/services/tdpInvestBase64Service', 'ngCookies'], function(angular, tdpInvestModule) {
    tdpInvestModule.service('tdpInvestAuthService', ['$cookieStore', '$http', '$rootScope', 'tdpInvestBase64Service', function($cookieStore, $http, $rootScope, tdpInvestBase64Service) {
        var service = {};

        service.login = function(username, password) {
            service.setCredentials(username, password);

            return $http.get('/api/login').then(handleSuccess, function () {
                service.clearCredentials();
                return { success: false, message: "Wrong email or password." };
            });
        };

        service.register = function(username, password) {
            return $http.post('/api/register', { mail: username, password: password }).then(handleSuccess, function (response) {
                if (response.status == 409){
                    return { success: false, message: "Email address already in use." };
                }
                return { success: false, message: "Registration failed." };
            });
        };

        service.setCredentials = function(email, password) {
            var authdata = tdpInvestBase64Service.encode(email + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: email,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $cookieStore.put('globals', $rootScope.globals);
        };

        service.clearCredentials = function() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = '';
        };

        service.watchAuthorizationStatus = function(loginCallback, logoutCallback) {
            $rootScope.$watch('globals.currentUser', function(newVal) {
                if (newVal) { // user logged in
                    loginCallback();
                } else { // user logged out
                    logoutCallback();
                }
            }, true);
        };

        function handleSuccess(res) {
            res.success = true;
            return res;
        }

        return service;
    }]);
});
