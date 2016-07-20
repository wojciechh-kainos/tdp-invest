define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
    , 'application/controllers/tdpInvestNavbarController'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html"
                    }
                },
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
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
