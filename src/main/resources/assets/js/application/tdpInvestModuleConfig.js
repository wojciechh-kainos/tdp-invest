define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/chartController'
    , 'application/controllers/DataController'

], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider) {
        $stateProvider
            .state("data", {
                url: "/home",
                views: {
                     "chart@data": {
                         templateUrl: "html/partials/chart.html",
                          controller: "chartController"
                          },
                     "table@data": {
                         templateUrl: "html/partials/DataTablePage.html",
                          controller: "DataController"
                          },
                     "compare@": {
                         templateUrl: "html/partials/tdp-invest-compare.html",
                    }
                },
                resolve: {
                    dataUrl: function() {
                        return "/api/rows/get/data"
                    }
                }
            })
            .state("compare", {
                url: "/compare",
                views: {
                     "chart@compare": {
                         templateUrl: "html/partials/chart.html",
                          controller: "chartController"
                          },
                     "table@compare": {
                         templateUrl: "html/partials/DataTablePage.html",
                          controller: "DataController"
                          },
                     "compare@": {
                         templateUrl: "html/partials/tdp-invest-compare.html",
                    },
                    "userData@": {
                         templateUrl: "html/partials/userData.html",
                    }
                },
                resolve: {
                    dataUrl: function() {
                        return "api/rows/get/compare"
                    }
                }
            });

    });

    return tdpInvestModule;
});