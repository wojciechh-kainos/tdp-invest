define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestLoginController'
], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                authenticate: true,
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html"
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