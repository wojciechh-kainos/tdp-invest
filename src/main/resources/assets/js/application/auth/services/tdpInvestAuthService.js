define(['angular', 'application/auth/tdpInvestAuthModule', 'application/auth/services/tdpInvestBase64Service', 'ngCookies'], function (angular, tdpInvestAuthModule) {
    tdpInvestAuthModule.service('tdpInvestAuthService', ['$cookieStore', '$http', '$q', 'tdpInvestBase64Service', function ($cookieStore, $http, $q, tdpInvestBase64Service) {
        var service = {};

        service.login = function (username, password) {
            service.setCredentials(username, password);

            return $http.get('/api/login').then(function (res) {
                service.setCredentials(username, res.data);
                return res.data;
            }, function () {
                service.clearCredentials();
                return $q.reject({message: "Wrong email or password."});
            });
        };

        service.register = function (username, password) {
            return $http.post('/api/register', {mail: username, password: password}).then(function (response) {
                return response;
            }, function (response) {
                if (response.status == 409) {
                    return $q.reject({message: "Email address already in use."});
                }
                return $q.reject({message: "Registration failed."});
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
