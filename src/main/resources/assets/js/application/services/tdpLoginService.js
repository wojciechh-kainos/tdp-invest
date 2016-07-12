define(['angular','application/tdpInvestModule', 'ngCookies'], function(angular, tdpInvestModule) {
    tdpInvestModule.service('tdpLoginService', ['$cookieStore','$http', '$rootScope', '$timeout',function($cookieStore,$http, $rootScope, $timeout) {

                    var service = {};

                    service.Login = function (username, password, callback) {

                        $timeout(function(){
                            $http.post('/api/login', { mail: username, password: password })
                                .then(function (response) {

                                    response.success = true;
                                    callback(response);
                                }, function(response){

                                    response.message = "Email or password incorrect.";
                                    callback(response);
                                });
                        }, 1000);


                    };

                    service.SetCredentials = function (username, password) {
                        var authdata = username + ':' + password;

                        $rootScope.globals = {
                            currentUser: {
                                username: username,
                                authdata: authdata
                            }
                        };

                        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                        $cookieStore.put('globals', $rootScope.globals);
                    };

                    service.ClearCredentials = function () {
                        $rootScope.globals = {};
                        $cookieStore.remove('globals');
                        $http.defaults.headers.common.Authorization = 'Basic ';
                    };

                    return service;
                }])


});


