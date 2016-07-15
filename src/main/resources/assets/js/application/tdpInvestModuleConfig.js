define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestDateController'
    , 'application/directives/tdpInvestCalendarDirective'
    , 'application/directives/tdpInvestTableDirective'
    , 'application/directives/tdpInvestChartDirective'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
    , 'application/controllers/tdpInvestNavbarController'


], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("main", {
                url: "/",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html",
                        controller: "tdpInvestCompareController"
                    },
                    "navbar": {
                        templateUrl: "html/partials/tdp-invest-navbar.html"
                    }
                }
            })
            .state("compare", {
                url: "/compare",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-compare.html",
                        controller: "tdpInvestCompareController"
                    },
                     "navbar": {
                         templateUrl: "html/partials/tdp-invest-navbar.html"
                     }
                }
            })

            .state("sign-in",{
                url:"/sign-in",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-sign-in.html"
                    },
                    "navbar":{
                        templateUrl: "html/partials/tdp-invest-navbar-logout.html"
                    }
                }
            })
            .state("date",{
                url:"/date",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-date.html",
                        controller: "tdpInvestDateController"
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
