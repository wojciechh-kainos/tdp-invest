define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestDateController'
    , 'application/directives/tdpInvestCalendarDirective'
    , 'application/directives/tdpInvestTableDirective'
    , 'application/directives/tdpInvestChartDirective'
], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider) {
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
            .state("login",{
                url:"/login",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-login.html"
                    },
                    "navbar":{
                        templateUrl: "html/partials/tdp-invest-navbar-logout.html"
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
            })

    });

    return tdpInvestModule;
});