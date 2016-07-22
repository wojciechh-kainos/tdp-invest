define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/directives/tdpInvestNavbarDirective'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider) {
        $stateProvider
            .state("tdp", {
                abstract: true,
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html"
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
                }).state("tdp.person", {
                    url: "^/person/{personId}",
                    views: {
                        "main@tdp": {
                            templateUrl: "html/partials/tdp-invest-person.html",
                            controller: "tdpInvestPersonController"
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
