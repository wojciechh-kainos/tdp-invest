define(['angular', 'application/auth/tdpInvestAuthModule', 'application/auth/services/tdpInvestBase64Service', 'ngCookies'], function (angular, tdpInvestAuthModule) {
    tdpInvestAuthModule.service('tdpInvestAuthService', ['$cookieStore', '$http', 'tdpInvestBase64Service', function ($cookieStore, $http, tdpInvestBase64Service) {
        var service = {};

        service.login = function (username, password) {
            service.setCredentials(username, password);

            return $http.get('/api/login').then(function (res) {
                service.setCredentials($cookieStore.get('currentUser').username, res.data);
                res.success = true;
                return res;
            }, function () {
                service.clearCredentials();
                return {success: false, message: "Wrong email or password."};
            });
        };

        service.register = function (username, password) {
            return $http.post('/api/register', {mail: username, password: password}).then(function (res) {
                res.success = true;
                return res;
            }, function (response) {
                if (response.status == 409) {
                    return {success: false, message: "Email address already in use."};
                }
                return {success: false, message: "Registration failed."};
            });
        };

        service.setCredentials = function (email, password) {
            var authdata = tdpInvestBase64Service.encode(email + ':' + password);

            var currentUser = {
                username: email,
                authdata: authdata
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $cookieStore.put('currentUser', currentUser);
        };

        service.clearCredentials = function () {
            $cookieStore.remove('currentUser');
            $http.defaults.headers.common.Authorization = '';
        };

        return service;
    }]);
});
