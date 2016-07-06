define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
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
            }).state("tdp.empty", {
                url: "/empty",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-empty.html"
                    }
                }
            }).state("another", {
                url: "/another",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-another.html"
                    }
                }
            });
    });

    return tdpInvestModule;
});