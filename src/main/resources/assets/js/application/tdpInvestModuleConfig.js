define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/chartController'
    , 'application/controllers/multiplyController'
    , 'application/controllers/RowController'
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

            .state("multiply", {
                url: "/multiply",
                views: {
                    "@": {
                        templateUrl: "html/partials/multiply.html",
                        controller: "multiplyController"
                        }
                    }
                }
            ).state("row", {
                url: "/row",
                views: {
                    "@": {
                        templateUrl: "html/partials/row.html",
                        controller: "RowController"
                        }
                    }
                }
            ).state("multiply.display", {
                url: "/display",
                views: {
                    "example@multiply": {
                        templateUrl: "html/partials/display.html",
                        }
                    }
                }
            )
            .state("tdp.compare", {
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