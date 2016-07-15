define(['angular', 'application/tdpInvestModule', 'ui-bootstrap', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.directive('tdpChart', function() {
var controller = ['$scope', function($scope) {

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
                    data: $scope.prices
                }, {
                    showInLegend: false,
                    data: $scope.investPrices
                }],
                title: {
                    text: 'Stock prices'
                },
                loading: false,
                xAxis: {
                    title: {
                        text: 'Date'
                    },
                    categories: $scope.dates
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
                        prices: "=",
                        dates: "="
                        }
        };
    });
});