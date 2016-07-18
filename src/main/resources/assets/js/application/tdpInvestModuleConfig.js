define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
    , 'application/controllers/tdpInvestNavbarController'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider, $urlRouterProvider) {
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
