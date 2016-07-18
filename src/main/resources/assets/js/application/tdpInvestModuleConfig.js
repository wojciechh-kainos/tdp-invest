define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestInvestmentController'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestMainController'
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
            }).state("compare", {
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