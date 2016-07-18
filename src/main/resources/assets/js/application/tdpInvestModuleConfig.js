define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestMainViewController'
    , 'application/services/tdpInvestStockDataService'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html",
                        controller: "tdpInvestMainViewController",
                        resolve: {
                            stockDataService: "stockData",
                            stockDataPromise: function (stockDataService) {
                                return stockDataService.promise;
                            }
                        }
                    }
                }
            }).state("tdp.person", {
            url: "/person/{personId}",
            views: {
                "@": {
                    templateUrl: "html/partials/tdp-invest-person.html",
                    controller: "tdpInvestPersonController"
                }
            }
        }).state("login", {
            url: "/login",
            views: {
                "@": {
                    templateUrl: "html/partials/tdp-invest-login.html",
                    controller: "tdpInvestLoginController"
                }
            }
        }).state("register", {
            url: "/register",
            views: {
                "@": {
                    templateUrl: "html/partials/tdp-invest-register.html",
                    controller: "tdpInvestRegisterController"
                }
            }
        }).state("compare", {
            url: "/compare",
            views: {
                "@": {
                    templateUrl: "html/partials/tdp-invest-compare.html",
                    controller: "tdpInvestCompareController",
                    resolve: {
                        stockDataService: "stockData",
                        stockDataPromise: function (stockDataService) {
                            return stockDataService.promise;
                        }
                    }
                }
            }
        }).state("compare.calculated", {
            views: {
                "compare-chart": {
                    templateUrl: "html/partials/tdp-invest-compare-chart.html"
                }
            }
        });

        $urlRouterProvider.otherwise("/login");
    });

    tdpInvestModule.run(['$rootScope', '$state', 'tdpInvestAuthService', '$cookieStore', '$http',
        function ($rootScope, $state, tdpInvestAuthService, $cookieStore, $http) {
            var userLoggedIn = false;
            $rootScope.$state = $state;

            tdpInvestAuthService.watchAuthorizationStatus(function () {
                userLoggedIn = true;
            }, function () {
                userLoggedIn = false;
            });

            $rootScope.isLoggedIn = function () {
                return userLoggedIn;
            };

            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }
        }]);

    return tdpInvestModule;
});
