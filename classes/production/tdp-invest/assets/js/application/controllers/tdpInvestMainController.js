define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpCompareService) {



        var initializeChart = function() {
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
        }

        $scope.renderInfo = function(response) {
            $scope.stockData = response.data;
                        $scope.prices = [];
                        $scope.dates = [];
                        for (i = 0; i < $scope.stockData.length; i++) {
                            $scope.prices.push(parseFloat($scope.stockData[i].price));
                            $scope.dates.push($scope.stockData[i].date);
                        }
                        initializeTable();
                        initializeChart();
        }


        tdpCompareService.getData().then(function(response) {
                $scope.renderInfo(response);
        });
    });
});