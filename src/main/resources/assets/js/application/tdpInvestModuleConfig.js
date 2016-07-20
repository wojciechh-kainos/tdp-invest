define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
    , 'application/controllers/tdpInvestNavbarController'
    , 'application/controllers/chartController'
    , 'application/controllers/DataController'
    , 'application/controllers/DateController'
    , 'application/controllers/IndexController'
    , 'application/controllers/UserDataController'
    , 'application/controllers/ButtonController'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("root", {
                url: "",
                templateUrl: 'html/partials/tdp.html',
                controller: 'IndexController',
            })
                .state("root.home", {
                    url: "/home",
                    views: {
                         "chart@root": {
                             templateUrl: "html/partials/chart.html",
                              controller: "chartController"
                              },
                         "DateSegment@root": {
                             templateUrl: "html/partials/DateSegment.html",
                              controller: "DateController"
                              },
                         "table@root": {
                             templateUrl: "html/partials/DataTablePage.html",
                              controller: "DataController"
                              },
                         "submitButton@root": {
                            templateUrl: "html/partials/button.html",
                            controller: "ButtonController"
                         }

                    },
                    resolve: {
                        dataUrl: function() {
                            return "/api/rows/get"
                        },
                        redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    }

                })
                .state("root.compare", {
                    url: "/compare",
                    views: {
                         "chart@root": {
                             templateUrl: "html/partials/chart.html",
                              controller: "chartController"
                              },
                          "DateSegment@root": {
                             templateUrl: "html/partials/DateSegment.html",
                              controller: "DateController"
                              },
                         "table@root": {
                             templateUrl: "html/partials/DataTablePage.html",
                              controller: "DataController"
                              },
                         "userData@root": {
                             templateUrl: "html/partials/userData.html",
                             controller: "UserDataController"
                             },
                         "submitButton@root": {
                             templateUrl: "html/partials/button.html",
                             controller: "ButtonController"
                             }
                    },
                    resolve: {
                        dataUrl: function() {
                            return "api/rows/get"
                        },
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