define(['angular'
    , 'application/tdpInvestModule'
    , 'application/services/tdpChartConfigFactory'
    , 'application/services/tdpAuthenticationService'
    , 'application/directives/tdpNavbarDirective'
    , 'application/directives/tdpDatePickerDirective'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestHomeController'
    , 'application/controllers/tdpInvestUploadController'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestRegisterController'
], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider, RestangularProvider, flowFactoryProvider, $urlRouterProvider, toastrConfig) {
        $stateProvider
            .state("tdp", {
                abstract: true,
                url: "/tdp",
                resolve: {
                    isUserLoggedIn: _isUserLoggedIn
                 }
            })
            .state("tdp.login", {
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
                    isAuthenticated: _isAuthenticated
                  }
                }
              }
            });

        $urlRouterProvider.otherwise("/tdp/home");
        RestangularProvider.setBaseUrl('/api');


        function _isAuthenticated($state, tdpAuthenticationService, toastr) {
            if (!tdpAuthenticationService.isUserLoggedIn()) {
                toastr.error('You need to sign in to view this page.', 'Error');
                $state.go('tdp.login');
            }
        };

        function _isUserLoggedIn(tdpAuthenticationService) {
            tdpAuthenticationService.checkCookies();
        };

        flowFactoryProvider.defaults = {
          target: '/api/unit/loadData',
          permanentErrors: [404, 500, 501],
          testChunks: false,
          maxChunkRetries: 1,
          chunkRetryInterval: 5000,
          simultaneousUploads: 4
        };


         angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
          });

    });


    return tdpInvestModule;
});