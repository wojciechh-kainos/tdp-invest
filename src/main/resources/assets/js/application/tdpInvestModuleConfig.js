define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestMainViewController'
    , 'application/services/tdpInvestStockDataService'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                resolve: {
                    stockDataService: "stockData",
                    stockDataPromise: function (stockDataService) {
                        return stockDataService.promise;
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
        }).state("tdp.compare", {
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
        }).state("tdp.compare.calculated", {
            views: {
                "compare-chart": {
                    templateUrl: "html/partials/tdp-invest-compare-chart.html"
                }
            }
        }).state("tdp.chart", {
            url: "/home",
            views: {
                "@": {
                    templateUrl: "html/partials/tdp-invest-main.html",
                    controller: "tdpInvestMainViewController"
                }
            }
        });

        $urlRouterProvider.otherwise("/login");
    }]);

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
