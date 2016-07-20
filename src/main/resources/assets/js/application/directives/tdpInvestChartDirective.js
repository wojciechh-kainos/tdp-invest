define(['angular', 'application/tdpInvestModule', 'ui-bootstrap', 'application/services/tdpInvestCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.directive('tdpChart', function() {
        var controller = ['$scope', function($scope) {

            $scope.$watch('stockData', function() {
                $scope.prices = [];
                $scope.dates = [];
                for (i = 0; i < $scope.stockData.length; i++) {
                    $scope.prices.push(parseFloat($scope.stockData[i].price));
                    $scope.dates.push($scope.stockData[i].date);
                }
                $scope.chartConfig.xAxis.categories = $scope.dates;
                $scope.chartConfig.series[0].data = $scope.prices;
            });

            $scope.$watch('investData', function() {
                if($scope.investData !== undefined && $scope.investData.length > 0) {
                    $scope.investPrices = [];
                    for (i = 0; i < $scope.stockData.length; i++) {
                        $scope.investPrices.push(parseFloat($scope.investData[i].price));
                        $scope.dates.push($scope.investData[i].date);
                    }
                    $scope.chartConfig.series[1].data = $scope.investPrices;
                }
            });

            $scope.chartConfig = {
                options: {
                    chart: {
                        type: 'line'
                    },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    }
                },
                series: [{
                    showInLegend: false,
                }, {
                    showInLegend: false,
                }],
                title: {
                    text: 'Stock prices'
                },
                loading: false,
                xAxis: {
                    title: {
                        text: 'Date'
                    },
                },

                yAxis: {
                    title: {
                        text: 'Price'
                    }
                },
                useHighStocks: false,
                size: {
                    height: 400
                }
            };


        }];
        return {
            template: '<highchart id="chart1" config="chartConfig" class="center col-md-12"></highchart>',
            controller: controller,
            scope: {
                stockData: "=",
                investData: "="
            }
        };
    });
});