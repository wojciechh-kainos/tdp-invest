"use strict";
define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestHomeController", function($scope, ChartConfigFactory, tdpUnitService, NgTableParams) {
      $scope.investmentValue = 5000;
      $scope.chartConfig = {};
      var maxDate = Date();
      var minDate = Date();

      ////////////////////////////////datepicker:

      $scope.dt = new Date();
      $scope.dt2 = new Date();

      $scope.dateOptions = {
       formatYear: 'yy',
       maxDate: maxDate,
       minDate: minDate,
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


      $scope.updateChart = function() {
        var fundSeries = [];
        var categories = [];
        var value = parseInt($scope.investmentValue);
        var unit = [];

        tdpUnitService.getAll().then(function (data) {
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
          $scope.dateOptions.minDate = new Date(plainData[0].date);
          console.log(minDate);
          console.log(typeof minDate);
          $scope.dateOptions.maxDate = new Date(plainData[plainData.length - 1].date);

          $scope.chartConfig.series = [{name: 'funds investment', data: fundSeries, turboThreshold: 0}];
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

      $scope.$watch(function () {
        return $scope.dt;
      },function(value){
        var minDate = {
          type: 'minDate',
          value: value
        };
        changeData(minDate);
        console.log(value);
      });

      $scope.$watch(function () {
        return $scope.dt2;
      },function(value){
        var maxDate = {
          type: 'maxDate',
          value: value
        };
        changeData(maxDate);
        console.log(value);
      });

      var changeData = function(dateObj) {

        if(dateObj.type === 'minDate') {

        } else {

        }

      }
  });
});