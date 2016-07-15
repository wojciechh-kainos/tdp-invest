define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestCompareController", function($scope, ChartConfigFactory, tdpUnitService) {
    $scope.investmentValue = 5000;
    $scope.investmentPercent = 3;
    $scope.chartConfig = {};


    $scope.updateChart = function() {
      var bankSeries = [];
      var fundSeries = [];
      var categories = [];
      var percentPerDay = parseInt($scope.investmentPercent) / 365;
      var investmentValue = parseInt($scope.investmentValue);

      tdpUnitService.getAll().then(function (data) {
        var plainData = data.plain();
        var unitAmount = investmentValue / plainData[0].value;

        for (i = 0; i < plainData.length; i++) {
          var dateToFormat = new Date(plainData[i].date);
          var formattedDate = dateToFormat.getDate() + '/' + (dateToFormat.getMonth() + 1) + '/' +  dateToFormat.getFullYear();

          fundSeries.push(unitAmount * plainData[i].value);
          categories.push(formattedDate);
        }

        for(i = 0; i < categories.length; i++) {
          var value = (investmentValue + (investmentValue * i * percentPerDay/100)).toFixed(2);
          bankSeries.push(parseFloat(value));

        }
        $scope.chartConfig.series = [{name: 'funds investment', data: fundSeries, turboThreshold: 0}, {name: 'bank investment', data: bankSeries, turboThreshold: 0}];
        $scope.chartConfig.xAxis.categories = categories;
      });
    };

    $scope.chartConfig = ChartConfigFactory('Compare', 'the profit from bank and fund investment', [], []);
    $scope.updateChart();

  });
});
