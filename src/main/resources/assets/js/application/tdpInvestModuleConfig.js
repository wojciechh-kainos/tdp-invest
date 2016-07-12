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
                templateUrl: 'index.html',
                controller: 'IndexController',
                receivedData: "data"

            })
                .state("root.data", {
                    url: "/home",
                    data: {
                        startDate: "startDateVal",
                        endDate: "endDateVal"
                    },
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
                                },
                         "submitButton@": {
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
                    data: {
                        startDate: "startDateCompareVal",
                        endDate: "endDateCompareVal",
                        input: "inputCompareVal",
                        percentage: "percentageCompareVal",
                        receivedData: "data"
                    },
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
                             controller: "UserDataController"
                             },
                             "submitButton@": {
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