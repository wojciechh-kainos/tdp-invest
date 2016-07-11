define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestHomeController", function($scope, ChartConfigFactory, tdpUnitService) {
      $scope.investmentValue = 5000;
      $scope.chartConfig = {};


      $scope.updateChart = function() {
        var fundSeries = [];
        var categories = [];
        var value = parseInt($scope.investmentValue);

        tdpUnitService.getAll().then(function (data) {
          var plainData = data.plain();
          var unitAmount = value / plainData[0].value;

          for (i = 0; i < plainData.length; i++) {
            fundSeries.push(value + (value -  unitAmount * plainData[i].value));
            categories.push(plainData[i].date);
          }


          $scope.chartConfig.series = [{name: 'funds investment', data: fundSeries}];
          $scope.chartConfig.xAxis.categories = categories;
        });
      };

      $scope.chartConfig = ChartConfigFactory('Profit', 'from fund investment of ' + $scope.investmentValue + ' PLN', [], []);
      $scope.updateChart();
  });
});