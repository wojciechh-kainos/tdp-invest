"use strict";
define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestHomeController", function($rootScope, $scope, ChartConfigFactory, tdpUnitService, NgTableParams) {
      $scope.chartConfig = {};

      $rootScope.title = "Home";

      /////////////////////////////////
      var processData = function (data) {
        if (data.length == 0) {
            console.log("NO DATA");
            $scope.dataError = true;
            return;
        }
        var fundSeries = [];
        var categories = [];
        var unit = [];

        var plainData = data.plain();
        console.log(plainData);

        for (var i = 0; i < plainData.length; i++) {
          var dateToFormat = new Date(plainData[i].date);
          var formattedDate = dateToFormat.getDate() + '/' + (dateToFormat.getMonth() + 1) + '/' +  dateToFormat.getFullYear();

          fundSeries.push(parseFloat(plainData[i].value));
          categories.push(formattedDate);
          unit.push({value: parseFloat(plainData[i].value), date: formattedDate});
        }


        if (!$scope.dt && !$scope.dt2) {
          $scope.dt = $scope.minDate = new Date(plainData[0].date);
          $scope.dt2 = $scope.maxDate = new Date(plainData[plainData.length - 1].date);
        }

        $scope.chartConfig.series = [{name: 'funds investment', data: fundSeries, turboThreshold: 0}];
        $scope.chartConfig.xAxis.categories = categories;


        $scope.tableParams = new NgTableParams({ count: 5 }, { counts: [5, 10], dataset: unit});
        $scope.cols = [
          { field: "date", title: "Date", sortable: "date", show: true },
          { field: "value", title: "Value", sortable: "value", show: true },
        ];
      }

      //////////////////////////////////chart:
      $scope.updateChart = function(minDate, maxDate) {
        if (arguments.length === 2) {
          tdpUnitService.getAllWithinRange(minDate, maxDate).then(function(data) {
            processData(data);
          });
        } else {
          tdpUnitService.getAll().then(function (data) {
            processData(data);
          });
        }
      };

      $scope.chartConfig = ChartConfigFactory('Investment fund', 'Unit value over time', [], []);
      $scope.updateChart();

      ////////////////////////////////datepicker:
      $scope.$watch("dt", function(value, oldValue){
        if(oldValue != undefined) {
          var newMinDate = new Date(value);
          $scope.minDate = newMinDate;

          $scope.updateChart($scope.minDate, $scope.maxDate);
        }
      });

      $scope.$watch("dt2",function(value, oldValue){
      if(oldValue != undefined) {
        var newMaxDate = new Date(value);
        $scope.maxDate = newMaxDate;

        $scope.updateChart($scope.minDate, $scope.maxDate);
        }
      });

  });
});