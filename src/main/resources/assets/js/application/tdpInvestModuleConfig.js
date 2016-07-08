define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/chartController'
    , 'application/controllers/DataController'

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
            .state("tdp.data", {
                url: "/home",
                views: {
                     "chart@tdp.compare": {
                         templateUrl: "html/partials/chart.html",
                          controller: "chartController"
                          },
                     "table@tdp.compare": {
                         templateUrl: "html/partials/DataTablePage.html",
                          controller: "DataController"
                          },
                     "compare@": {
                         templateUrl: "html/partials/tdp-invest-compare.html",
                    }
                }
            })
            .state("tdp.compare", {
                url: "/compare",
                views: {
                     "chart@tdp.compare": {
                         templateUrl: "html/partials/chart.html",
                          controller: "chartController"
                          },
                     "table@tdp.compare": {
                         templateUrl: "html/partials/DataTablePage.html",
                          controller: "DataController"
                          },
                     "compare@": {
                         templateUrl: "html/partials/tdp-invest-compare.html",
                    }
                }
            });

    });

    return tdpInvestModule;
});