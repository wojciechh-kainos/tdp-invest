define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/directives/tdpInvestNavbarDirective'
    , 'application/controllers/tdpInvestIndexController'
    , 'application/controllers/tdpInvestDateController'
    , 'application/controllers/tdpInvestButtonController'
    , 'application/controllers/tdpInvestChartController'
    , 'application/controllers/tdpInvestTableController'
    , 'application/controllers/tdpInvestCompareInputController'

], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider) {
        $stateProvider
            .state("tdp", {
                abstract: true,
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest.html",
                        controller: 'tdpInvestIndexController'
                    }
                },
                resolve: {
                    redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                }
                }).state("tdp.home", {
                                      url: "^/home",
                                      views: {
                                           "table@tdp": {
                                               templateUrl: "html/partials/tdp-invest-table.html",
                                                controller: "tdpInvestTableController"
                                                }
                                      },
                                      resolve: {
                                      }

                                  })
                                  .state("tdp.compare", {
                                      url: "^/compare",
                                      views: {
                                           "table@tdp": {
                                               templateUrl: "html/partials/tdp-invest-table.html",
                                                controller: "tdpInvestTableController"
                                                },
                                           "userData@tdp": {
                                               templateUrl: "html/partials/tdp-invest-userData.html",
                                               controller: "tdpInvestCompareInputController"
                                               }
                                      },
                                      resolve: {
                                      }
                                  })
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
