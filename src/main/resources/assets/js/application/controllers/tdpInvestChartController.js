define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestChartController", function($scope, $stateParams) {

    $scope.investmentValue = 5000;
    $scope.investmentPercent = 3;
    var data = [];

    $scope.chartConfig = {

          options: {
              chart: {
                  type: 'spline'
              },
              tooltip: {
                  valueSuffix: ' PLN'
              },
          },

          title: {
              text: 'Income'
          },
          subtitle: {
              text: 'Much money wow'
          },
          xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
              title: {
                  text: 'Value [PLN]'
              },
              minorGridLineWidth: 0,
              gridLineWidth: 0,
              alternateGridColor: null
          },
          tooltip: {
              valueSuffix: ' PLN'
          },
          series: [{
              name: 'Bank investment',
              data: data

          }],
          navigation: {
              menuItemStyle: {
                  fontSize: '10px'
              }
          }
        };

    $scope.makeData = function() {
        data = [];
        var percentPerMonth = $scope.investmentPercent / 12;
        var value = $scope.investmentValue;
        for(i = 1; i < 13; i++) {
            data.push(value);
            value += value * percentPerMonth/100;
            console.log(value);
        }
        console.log("halo");
    };


    $scope.updateChart = function() {
        $scope.makeData();
        $scope.chartConfig.series[0].data = data;
    };


    });
});
