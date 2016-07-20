define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
    , 'application/controllers/tdpInvestNavbarController'
    , 'application/controllers/tdpInvestChartController'
    , 'application/controllers/tdpInvestDataController'
    , 'application/controllers/tdpInvestDateController'
    , 'application/controllers/tdpInvestIndexController'
    , 'application/controllers/tdpInvestCompareInputController'
    , 'application/controllers/tdpInvestButtonController'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("root", {
                url: "/",
                abstract: "true",
                templateUrl: 'html/partials/tdp-invest.html',
                controller: 'tdpInvestIndexController',
                resolve: {
                        redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    }
            })
                .state("root.home", {
                    url: "^/home",
                    views: {
                         "table@root": {
                             templateUrl: "html/partials/tdp-invest-table.html",
                              controller: "tdpInvestDataController"
                              }
                    },
                    resolve: {
                       // redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    }

                })
                .state("root.compare", {
                    url: "^/compare",
                    views: {
                         "table@root": {
                             templateUrl: "html/partials/tdp-invest-table.html",
                              controller: "tdpInvestDataController"
                              },
                         "userData@root": {
                             templateUrl: "html/partials/tdp-invest-userData.html",
                             controller: "tdpInvestCompareInputController"
                             }
                    },
                    resolve: {
                       // redirectIfNotAuthenticated: _redirectIfNotAuthenticated
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

    })

    return tdpInvestModule;
});