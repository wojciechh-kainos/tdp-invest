define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/chartController'
    , 'application/controllers/DataController'
    , 'application/controllers/DateController'
    , 'application/controllers/IndexController'
    , 'application/controllers/UserDataController'
    , 'application/controllers/ButtonController'

], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider) {
        $stateProvider
            .state("root", {
                url: "",
                templateUrl: 'html/partials/tdp.html',
                controller: 'IndexController',
            })
                .state("root.data", {
                    url: "/home",
                    views: {
                         "chart@root": {
                             templateUrl: "html/partials/chart.html",
                              controller: "chartController"
                              },
                         "DateSegment@root": {
                             templateUrl: "html/partials/DateSegment.html",
                              controller: "DateController"
                              },
                         "table@root": {
                             templateUrl: "html/partials/DataTablePage.html",
                              controller: "DataController"
                              },
                         "submitButton@root": {
                            templateUrl: "html/partials/button.html",
                            controller: "ButtonController"
                         }

                    },
                    resolve: {
                        dataUrl: function() {
                            return "/api/rows/get/data"
                        }
                    }
                })
                .state("root.compare", {
                    url: "/compare",
                    views: {
                         "chart@root": {
                             templateUrl: "html/partials/chart.html",
                              controller: "chartController"
                              },
                          "DateSegment@root": {
                             templateUrl: "html/partials/DateSegment.html",
                              controller: "DateController"
                              },
                         "table@root": {
                             templateUrl: "html/partials/DataTablePage.html",
                              controller: "DataController"
                              },
                         "userData@root": {
                             templateUrl: "html/partials/userData.html",
                             controller: "UserDataController"
                             },
                         "submitButton@root": {
                             templateUrl: "html/partials/button.html",
                             controller: "ButtonController"
                             }
                    },
                    resolve: {
                        dataUrl: function() {
                            return "api/rows/get/compare"
                        }
                    }
                });

    });

    return tdpInvestModule;
});