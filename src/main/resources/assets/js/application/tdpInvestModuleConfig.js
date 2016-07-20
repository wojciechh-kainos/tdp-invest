define(['angular'
    , 'application/tdpInvestModule'
    , 'application/services/tdpChartConfigFactory'
    , 'application/services/tdpAuthenticationService'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestHomeController'
    , 'application/controllers/tdpInvestUploadController'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider, RestangularProvider, $urlRouterProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html"
                    }
                }
            }).state("tdp.login", {
                  url: "/login",
                  views: {
                      "@": {
                          templateUrl: "html/partials/tdp-invest-login.html",
                          controller: "tdpInvestLoginController"
                      }
                  }
              }).state("tdp.register", {
                 url: "/register",
                 views: {
                     "@": {
                         templateUrl: "html/partials/tdp-invest-register.html",
                         controller: "tdpInvestRegisterController"
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
                  controller: "tdpInvestUploadController",
                  resolve: {
                    isAuthenticated: isAuthenticated
                  }
                }
              }
            });

        $urlRouterProvider.otherwise("tdp");
        RestangularProvider.setBaseUrl('/api');

        function isAuthenticated($state, $cookieStore) {
            var globals = $cookieStore.get('globals');
            if (!globals.currentUser) {
                $state.go('tdp');
            }
        };
    });

    return tdpInvestModule;
});