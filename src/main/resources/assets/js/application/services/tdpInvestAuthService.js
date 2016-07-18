define(['angular','application/tdpInvestModule', 'application/services/tdpInvestBase64Service', 'ngCookies'], function(angular, tdpInvestModule) {
    tdpInvestModule.service('tdpInvestAuthService', ['$cookieStore', '$http', '$rootScope', 'tdpInvestBase64Service', function($cookieStore, $http, $rootScope, tdpInvestBase64Service) {


        this.login = function(username, password) {
            return $http.post('/api/login', { mail: username, password: password }).then(handleSuccess, handleError('Bad credentials'));
        };

        this.register = function(username, password) {
            return $http.post('/api/register',  { mail: username, password: password }).then(handleSuccess, function (response) {
                if(response.status == 409){
                    return { success: false, message: "Email address already in use." };
                }
                return { success: false, message: "Registration failed." };
            });
        };

        this.setCredentials = function(email, password) {
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

        this.clearCredentials = function() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common['Authorization'] = '';
        };

        this.watchAuthorizationStatus = function(loginCallback, logoutCallback) {
            $rootScope.$watch('globals.currentUser', function(newVal) {
                if (newVal) { // user logged in
                    loginCallback();
                } else { // user logged out
                    logoutCallback();
                }
            }, true);
        };

        // private functions

        function handleSuccess(res) {
            res.success = true;
            return res;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }


    }]);
});
