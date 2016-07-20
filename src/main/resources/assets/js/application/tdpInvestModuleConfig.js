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
                },
                templateUrl: 'html/partials/tdp-invest-main.html'
        }).state("login", {
            url: "/login",
            templateUrl: "html/partials/tdp-invest-login.html",
            controller: "tdpInvestLoginController"
        }).state("register", {
            url: "/register",
            templateUrl: "html/partials/tdp-invest-register.html",
            controller: "tdpInvestRegisterController"
        }).state("tdp.compare", {
            url: "/compare",
            templateUrl: "html/partials/tdp-invest-compare.html",
            controller: "tdpInvestCompareController"
        }).state("tdp.compare.calculated", {
            views: {
                "compare-chart": {
                    templateUrl: "html/partials/tdp-invest-compare-chart.html"
                }
            }
        }).state("tdp.dashboard", {
            url: "/dashboard",
            templateUrl: "html/partials/tdp-invest-dashboard.html",
            controller: "tdpInvestMainViewController",
            resolve: {
                redirectIfNotAuthenticated: _redirectIfNotAuthenticated
            }
        });

        $urlRouterProvider.otherwise("/login");
    }]);

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
