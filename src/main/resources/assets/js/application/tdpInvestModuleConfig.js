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
                url: "/tdp",
                templateUrl: 'html/partials/tdp.html',
                controller: 'IndexController',
                data: {
                       startDate: new Date(2013/05/03),
                       endDate: new Date(2013/05/03),
                       input: "inputCompareVal",
                       percentage: "percentageCompareVal",
                       receivedData: "data"
                },

            })
                .state("root.data", {
                    url: "/home",
                    views: {
                         "chart@root.data": {
                             templateUrl: "html/partials/chart.html",
                              controller: "chartController"
                              },
                         "DateSegment@root": {
                             templateUrl: "html/partials/DateSegment.html",
                              controller: "DateController"
                              },
                         "table@root.data": {
                             templateUrl: "html/partials/DataTablePage.html",
                              controller: "DataController"
                              },
                         "compare@root": {
                             templateUrl: "html/partials/tdp-invest-compare.html",
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
                         "chart@root.compare": {
                             templateUrl: "html/partials/chart.html",
                              controller: "chartController"
                              },
                          "DateSegment@root": {
                             templateUrl: "html/partials/DateSegment.html",
                              controller: "DateController"
                              },
                         "table@root.compare": {
                             templateUrl: "html/partials/DataTablePage.html",
                              controller: "DataController"
                              },
                         "compare@root": {
                             templateUrl: "html/partials/tdp-invest-compare.html",
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