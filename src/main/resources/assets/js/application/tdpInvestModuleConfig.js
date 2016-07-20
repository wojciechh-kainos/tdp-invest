define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("tdp", {
                url: "",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html"
                    }
                }
            }).state("tdp.person", {
            url: "^/person/{personId}",
            views: {
                "@": {
                    templateUrl: "html/partials/tdp-invest-person.html",
                    controller: "tdpInvestPersonController"
                }
            }
        });
        // $urlRouterProvider.otherwise("/auth");

    });

    return tdpInvestModule;
});
