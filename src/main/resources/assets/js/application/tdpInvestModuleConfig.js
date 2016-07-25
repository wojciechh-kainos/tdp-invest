define(['angular'
    , 'application/tdpInvestModule'
    , 'application/directives/tdpInvestNavbarDirective'
    , 'application/controllers/tdpInvestInvestmentController'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestMainController'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider) {
        $stateProvider
            .state("tdp", {
                abstract: true,
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html",
                        controller: "tdpInvestMainController"
                    }
                },
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
            }).state("tdp.front", {
            url: "",
            views: {
                "main@tdp": {
                    templateUrl: "html/partials/tdp-invest-front.html"
                }
            }
        }).state("tdp.compare", {
            url: "/compare",
            views: {
                "@": {
                    templateUrl: "html/partials/tdp-invest-compare.html",
                    controller: "tdpInvestCompareController"
                }
            }
        });
    });

    function _redirectIfNotAuthenticated($cookieStore, $window, $http) {
        var user = $cookieStore.get('currentUser') || {};

        if (!user) {
            $window.location.href = "/auth";
        } else {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + user.authdata; // jshint ignore:line

            return $http.get('/api/login').then(undefined, function () {
                $window.location.href = "/auth";
            });
        }
    }

    return tdpInvestModule;
});
