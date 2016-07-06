define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestTestStateController'
], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html"
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
            }).state("testState", {
                              url: "/testState",
                              views: {
                                  "@": {
                                      templateUrl: "html/partials/tdp-invest-testState.html",
                                      controller: "tdpInvestTestStateController"
                                  }
                              }
                          })
            .state("thing",{
                url: "/thing",
                views: {
                   "@": {
                    templateUrl: "html/partials/tdp-invest-thing.html"
                   }
                }
            });
    });

    return tdpInvestModule;
});