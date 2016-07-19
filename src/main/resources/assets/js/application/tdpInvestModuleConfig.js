define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestMainController',
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestUploadController'
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
            }).state("tdp.person", {
                url: "/person/{personId}",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-person.html",
                        controller: "tdpInvestPersonController"
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
            }).state("upload", {
                url: "/upload",
                views: {
                  "@": {
                      templateUrl: "html/partials/tdp-invest-upload.html",
                      controller: "tdpInvestUploadController"
                  }
                }
            });
    });

    return tdpInvestModule;
});