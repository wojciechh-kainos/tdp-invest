define(['angular', 'application/auth/tdpInvestAuthModule', 'application/auth/services/tdpInvestBase64Service', 'ngCookies'], function (angular, tdpInvestAuthModule) {
    tdpInvestAuthModule.service('tdpInvestAuthService', ['$cookieStore', '$http', '$q', 'tdpInvestBase64Service', function ($cookieStore, $http, $q, tdpInvestBase64Service) {
        var service = {};

        service.login = function (username, password) {
            service.setCredentials(username, password);

            return $http.get('/api/login').then(function (res) {
                service.setCredentials(username, res.data);
                return res.data;
            }, function (err) {
                err.message = "Wrong email or password.";
                return $q.reject(err);
            });
        };

        service.register = function (username, password) {
            return $http.post('/api/register', {mail: username, password: password}).then(function (response) {
                return response;
            }, function (err) {
                if (err.status == 409) {
                    err.message = "Email address already in use.";
                } else {
                    err.message = "Registration failed.";
                }
                return $q.reject(err);
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
