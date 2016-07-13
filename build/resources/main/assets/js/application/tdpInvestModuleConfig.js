define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/tdpInvestPersonController'
    , 'application/controllers/tdpInvestLoginController'
    , 'application/controllers/tdpInvestNavbarController'
    , 'application/controllers/tdpInvestCompareController'
    , 'application/controllers/tdpInvestMainViewController'
    , 'application/services/tdpInvestStockDataService'

], function (angular, tdpInvestModule) {
    tdpInvestModule.config(function ($stateProvider) {
        $stateProvider
            .state("tdp", {
                url: "/tdp",
                // authenticate: true,
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html",
                        controller: "tdpInvestMainViewController",
                        resolve: {
                            stockDataService: "stockData",
                            stockDataPromise: function (stockDataService) {
                                return stockDataService.promise;
                            }
                        }
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
        }).state("tdp.empty", {
            url: "/empty",
            views: {
                "@": {
                    templateUrl: "html/partials/tdp-invest-empty.html"
                }
            }
        }).state("another", {
            url: "/another",
            views: {
                "@": {
                    templateUrl: "html/partials/tdp-invest-another.html"
                }
            }
        }).state("compare", {
            url: "/compare",
            views: {
                "@": {

                    templateUrl: "html/partials/tdp-invest-compare.html",
                    controller: "tdpInvestCompareController",
                    resolve: {
                        stockDataService: "stockData",
                        stockDataPromise: function (stockDataService) {
                            return stockDataService.promise;
                        }
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
        // $urlRouterProvider.otherwise("/login");
    });

    return tdpInvestModule;
});
