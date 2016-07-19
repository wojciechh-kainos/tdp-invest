define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestMainController'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
    , 'application/controllers/tdpInvestNavbarController'
    , 'application/controllers/tdpInvestUploadController'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider, $urlRouterProvider) {
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
            }).state("upload", {
                url: "/upload",
                views: {
                  "@": {
                      templateUrl: "html/partials/tdp-invest-upload.html",
                      controller: "tdpInvestUploadController"
                  }
                }
            }).state("login", {
                url: "/login",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-login.html",
                        controller: "tdpInvestLoginController"
                    }
                }
            }).state("register", {
                url: "/register",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-register.html",
                        controller: "tdpInvestRegisterController"
                    }
                }
            });
        $urlRouterProvider.otherwise("/login");
    });

    return tdpInvestModule;
});