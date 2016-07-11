define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestCompareController'
], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html"
                    },
                    "navbar": {
                        templateUrl: "html/partials/tdp-invest-navbar.html"
                    }
                }
            }).state("tdp.person", {
                url: "/person/{personId}",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-person.html",
                        controller: "tdpInvestPersonController"
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
    });

    return tdpInvestModule;
});