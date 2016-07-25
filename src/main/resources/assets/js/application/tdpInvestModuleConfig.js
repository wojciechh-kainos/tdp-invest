define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/directives/tdpInvestCalendarDirective'
    , 'application/directives/tdpInvestTableDirective'
    , 'application/directives/tdpInvestChartDirective'
    , 'application/directives/tdpInvestInterestDirective'
    , 'application/directives/tdpInvestAddDirective'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
    , 'application/controllers/tdpInvestNavbarController'
    , 'application/controllers/tdpInvestUploadController'


], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("main", {
                url: "/",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html",
                        controller: "tdpInvestCompareController"
                    }
                },
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
            })
            .state("compare", {
                url: "/compare",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-compare.html",
                        controller: "tdpInvestCompareController"
                    }
                },
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
            })
            .state("login", {
                url: "/login",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-login.html",
                        controller: "tdpInvestLoginController"
                    }
                }
            })
            .state("register", {
                url: "/register",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-register.html",
                        controller: "tdpInvestRegisterController"
                    }
                }
             })
            .state("upload", {
                url: "/upload",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-upload.html",
                        controller: "tdpInvestUploadController"
                    }
                },
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
            });
        $urlRouterProvider.otherwise("/login");

       function _redirectIfNotAuthenticated($q, $state, $cookieStore) {
            var defer = $q.defer();
            if ($cookieStore.get('currentUser')) {
                defer.resolve();
            } else {
                $timeout(function () {
                    $state.go("login");
                });
                defer.reject();
            }
            return defer.promise;
        }
    });

    return tdpInvestModule;
});
