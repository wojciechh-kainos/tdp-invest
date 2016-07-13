"use strict";
define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestHomeController", function($scope, ChartConfigFactory, tdpUnitService, NgTableParams) {
      $scope.investmentValue = 5000;
      $scope.chartConfig = {};


      $scope.updateChart = function() {
        var fundSeries = [];
        var categories = [];
        var value = parseInt($scope.investmentValue);
        var unit = [];

        tdpUnitService.getAll().then(function (data) {
          var plainData = data.plain();
          var unitAmount = value / plainData[0].value;

          for (var i = 0; i < plainData.length; i++) {
            fundSeries.push(value + (value -  unitAmount * plainData[i].value));
            categories.push(plainData[i].date);
            unit.push({value: value + (value -  unitAmount * plainData[i].value), date: plainData[i].date});
          }


          $scope.chartConfig.series = [{name: 'funds investment', data: fundSeries}];
          $scope.chartConfig.xAxis.categories = categories;


          $scope.tableParams = new NgTableParams({ count: 5 }, { counts: [5, 10], dataset: unit});
          $scope.cols = [
            { field: "date", title: "Date", sortable: "date", show: true },
            { field: "value", title: "Value", sortable: "value", show: true },
          ];
        });
      };

      $scope.chartConfig = ChartConfigFactory('Profit', 'from fund investment of ' + $scope.investmentValue + ' PLN', [], []);
      $scope.updateChart();
  });
});