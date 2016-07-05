define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestInvestmentController'
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
            }).state("tdp.investment", {
                url: "/investment/{investmentId}",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-investment.html",
                        controller: "tdpInvestInvestmentController"
                    }
                }
            });
    });

    return tdpInvestModule;
});