define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestCompareController", function($scope, ChartConfigFactory, tdpUnitService) {
    $scope.investmentValue = 5000;
    $scope.investmentPercent = 3;
    $scope.chartConfig = {};


    $scope.updateChart = function() {
      var bankSeries = [];
      var fundSeries = [];
      var categories = [];
      var percentPerMonth = parseInt($scope.investmentPercent) / 12;
      var value = parseInt($scope.investmentValue);

      tdpUnitService.getAll().then(function (data) {
        var plainData = data.plain();
        var unitAmount = value / plainData[0].value;

        for (i = 0; i < plainData.length; i++) {
          fundSeries.push(unitAmount * plainData[i].value);
          categories.push(plainData[i].date);
        }
//        console.log(fundSeries);
        for(i = 0; i < categories.length; i++) {
          var x = value.toFixed(2);
          bankSeries.push(parseFloat(x));
          value += value * percentPerMonth/100;
        }

        $scope.chartConfig.series = [{name: 'funds investment', data: fundSeries}, {name: 'bank investment', data: bankSeries}];
        $scope.chartConfig.xAxis.categories = categories;
      });
    };

    $scope.chartConfig = ChartConfigFactory('Compare', 'the profit from bank and fund investment', [], []);
    $scope.updateChart();

  });
});
