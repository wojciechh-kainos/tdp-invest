"use strict";
define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestHomeController", function($rootScope, $scope, ChartConfigFactory, tdpUnitService, NgTableParams) {
      $scope.investmentValue = 5000;
      $scope.chartConfig = {};
      $scope.maxDate = null;
      $scope.minDate = null;

      $rootScope.title = "Home";

      /////////////////////////////////
      var processData = function (data) {
        if (data.length == 0) {
            console.log("NO DATA");
            return;
        }
        var fundSeries = [];
        var categories = [];
        var value = parseInt($scope.investmentValue);
        var unit = [];

        var plainData = data.plain();
        var unitAmount = value / plainData[0].value;

        for (var i = 0; i < plainData.length; i++) {
          var countedValue = (unitAmount * plainData[i].value).toFixed(2);
          var dateToFormat = new Date(plainData[i].date);
          var formattedDate = dateToFormat.getDate() + '/' + (dateToFormat.getMonth() + 1) + '/' +  dateToFormat.getFullYear();

          fundSeries.push(parseFloat(countedValue));
          categories.push(formattedDate);
          unit.push({value: parseFloat(countedValue), date: formattedDate});
        }


        if (!$scope.dt && !$scope.dt2) {
          $scope.dt = $scope.minDate = $scope.dateOptions.minDate = new Date(plainData[0].date);
          $scope.dt2 = $scope.maxDate = $scope.dateOptions.maxDate = new Date(plainData[plainData.length - 1].date);
        }

        $scope.chartConfig.series = [{name: 'funds investment', data: fundSeries, turboThreshold: 0}];
        $scope.chartConfig.xAxis.categories = categories;


        $scope.tableParams = new NgTableParams({ count: 5 }, { counts: [5, 10], dataset: unit});
        $scope.cols = [
          { field: "date", title: "Date", sortable: "date", show: true },
          { field: "value", title: "Value", sortable: "value", show: true },
        ];
      }

      ////////////////////////////////datepicker:

      $scope.dateOptions = {
       formatYear: 'yy',
       maxDate: $scope.maxDate,
       minDate: $scope.minDate,
       startingDay: 1,
       showWeeks: false
      };

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.popup1 = {
        opened: false
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.popup2 = {
        opened: false
      };

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

      $scope.chartConfig = ChartConfigFactory('Profit', 'from fund investment of ' + $scope.investmentValue + ' PLN', [], []);
      $scope.updateChart();

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