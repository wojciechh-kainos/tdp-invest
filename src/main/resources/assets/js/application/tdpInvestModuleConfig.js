define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestMainController',
    , 'application/controllers/tdpInvestCompareController'
], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html",
                        controller: "tdpInvestMainController"
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

    return tdpInvestModule;
});