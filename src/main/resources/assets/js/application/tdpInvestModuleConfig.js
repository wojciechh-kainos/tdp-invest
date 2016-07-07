define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/chartController'
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
            })
            .state("tdp.person", {
                url: "/person/{personId}",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-person.html",
                        controller: "tdpInvestPersonController"
                    }
                }
            })
            .state("tdp.emptysta", {
                url: "/empty",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-empty.html",
                    }
                }
            })
              .state("chart", {
                            url: "/chart",
                            views: {
                                "@": {
                                    templateUrl: "html/partials/chart.html",
                                    controller: "chartController"
                                }
                            }
                        });

    });

    return tdpInvestModule;
});