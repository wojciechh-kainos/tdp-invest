define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, ChartConfigFactory, tdpUnitService) {
        $scope.investmentValue = 5000;
        $scope.investmentPercent = 3;
        $scope.chartConfig = {};


         tdpUnitService.getAll().then(function (test) {
                $scope.test = test;
                for (a in test) {
                console.log(a);
                }
            });


        var series = [];
        var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


        $scope.updateChart = function() {

          var data = [];
          var percentPerMonth = parseInt($scope.investmentPercent) / 12;
          var value = parseInt($scope.investmentValue);

          for(i = 1; i < 13; i++) {
              data.push(value);
              value += value * percentPerMonth/100;
              console.log(value);
          }

            $scope.chartConfig.series = [{name: 'name', data: data}];
        };

        $scope.chartConfig = ChartConfigFactory('title', 'subtitle', series, categories);
        $scope.updateChart();

    });
});
