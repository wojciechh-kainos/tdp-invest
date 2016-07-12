define(['angular','application/tdpInvestModule', 'ngCookies'], function(angular, tdpInvestModule) {
    tdpInvestModule.service('tdpLoginService', ['$cookieStore','$http', '$rootScope', '$timeout',function($cookieStore,$http, $rootScope, $timeout) {

                    var service = {};

                    service.Login = function (username, password, callback) {

                        /* Dummy authentication for testing, uses $timeout to simulate api call
                         ----------------------------------------------*/
                        $timeout(function(){
                            var response = { success: username === 'test' && password === 'test' };
                            if(!response.success) {
                                response.message = 'Username or password is incorrect';
                            }
                            callback(response);
                        }, 1000);


                        /* Use this for real authentication
                         ----------------------------------------------*/
                        //$http.post('/api/authenticate', { username: username, password: password })
                        //    .success(function (response) {
                        //        callback(response);
                        //    });

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
        
        
        
        
        // this.user = {};
        //
        // this.storeToSession = function() {
        //     $cookieStore.put('userHeader', this.user.header);
        // };
        //
        // this.loadFromSession = function() {
        //     var userHeader = $cookieStore.get('userHeader');
        //     if ( userHeader ) {
        //         this.loadCurrentUser(userHeader);
        //     }
        // };
        //
        // this.loadCurrentUser = function(loadCurrentUser) {
        //     /* $http get to load user info with given header */
        // };
        //
        // this.login = function(email,password,ctrl) {
        //     var userIn = {
        //         username : "test",
        //         password : "password"
        //     }
        //     var that = this;
        //     $http.post('./api/login', userIn).success(function(data) {
        //         if (data.success === true) {
        //             that.user.username = userIn.username;
        //             that.user.header = btoa(userIn.username + ':' + userIn.password);
        //             ctrl.errorMessage = '';
        //             that.storeToSession();
        //         } else {
        //             /* show error and logout user */
        //         }
        //     }).error(function(arg) {
        //         /* show error and logout user */
        //     });
        //
        //     console.log("test");
        // }
        //
        // this.logout = function() {
        //     this.user = {};
        //     this.storeToSession();
        // }
        //
        // this.loadFromSession();


