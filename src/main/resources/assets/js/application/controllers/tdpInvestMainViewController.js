define(['angular', 'application/tdpInvestModule'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainViewController", function ($scope, stockData, $timeout) {
        var delayFilter;
        var fund = stockData.getCurrentFund();
        $scope.mydata = fund.units;
        $scope.isInRange = function (dateMin, dateMax) {
            return function (item) {
                if (typeof dateMin !== 'undefined' && typeof dateMin !== 'undefined') {
                    return (item[0] > dateMin) && (item[0] < dateMax)
                }
                return true;
            }
        };

        $scope.chartConfig = {
            options: {
                chart: {
                    zoomType: 'x'
                },
                rangeSelector: {
                    enabled: true
                },
                navigator: {
                    enabled: true
                },
                tooltip: {
                    pointFormat: "Value: {point.y:.2f}"
                }
            },
            xAxis: {
                events: {
                    setExtremes: function (event) {
                        $timeout.cancel(delayFilter);
                        delayFilter = $timeout(function () {
                            $scope.max = event.max;
                            $scope.min = event.min;
                            $scope.$apply();
                        }, 50)

                    }
                }
            },
            series: [],
            title: {
                text: fund.name
            },
            useHighStocks: true
        };

        $scope.chartConfig.series.push({
                id: 1,
                data: fund.units
            }
        );
    })

});
