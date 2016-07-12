define(['angular'
    , 'application/tdpInvestModule'
    , 'application/controllers/chartController'
    , 'application/controllers/DataController'
    , 'application/controllers/DateController'
    , 'application/controllers/IndexController'

], function(angular, tdpInvestModule) {
    tdpInvestModule.config(function($stateProvider) {
        $stateProvider
            .state("root", {
                url: "",
                data: {
                    startDate: "startDateVal",
                    endDate: "endDateVal",
                    input: "inputVal",
                    percentage: "percentageVal"
                     },
                template: 'index.html',
                controller: 'IndexController'
            })
                .state("root.data", {
                    url: "/home",
                    views: {
                         "chart@root.data": {
                             templateUrl: "html/partials/chart.html",
                              controller: "chartController"
                              },
                         "DateSegment@": {
                             templateUrl: "html/partials/DateSegment.html",
                              controller: "DateController"
                              },
                         "table@root.data": {
                             templateUrl: "html/partials/DataTablePage.html",
                              controller: "DataController"
                              },
                         "compare@": {
                             templateUrl: "html/partials/tdp-invest-compare.html",
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
                          "DateSegment@": {
                             templateUrl: "html/partials/DateSegment.html",
                              controller: "DateController"
                              },
                         "table@root.compare": {
                             templateUrl: "html/partials/DataTablePage.html",
                              controller: "DataController"
                              },
                         "compare@": {
                             templateUrl: "html/partials/tdp-invest-compare.html",
                             },
                         "userData@": {
                             templateUrl: "html/partials/userData.html",
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