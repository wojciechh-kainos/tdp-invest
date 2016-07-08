define(['angular'
    , 'application/tdpInvestModule'
    , 'application/services/tdpChartConfigFactory'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestCompareController'
], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider, RestangularProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html"
                    }
                }
            }).state("tdp.person", {
                url: "/person/{personId:[0-9]*}",
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

        RestangularProvider.setBaseUrl('/api');

    });

    return tdpInvestModule;
});