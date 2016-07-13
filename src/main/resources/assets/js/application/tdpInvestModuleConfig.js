define(['angular'
    , 'application/tdpInvestModule'
    , 'application/services/tdpChartConfigFactory'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestHomeController'
    , 'application/controllers/tdpInvestUploadController'
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
            }).state("tdp.home", {
              url: "/home",
              views: {
                "@": {
                  templateUrl: "html/partials/tdp-invest-home.html",
                  controller: "tdpInvestHomeController"
                }
              }
            }).state("tdp.upload", {
              url: "/upload",
              views: {
                "@": {
                  templateUrl: "html/partials/tdp-invest-upload.html",
                  controller: "tdpInvestUploadController"
                }
              }
            });

        RestangularProvider.setBaseUrl('/api');

    });

    return tdpInvestModule;
});