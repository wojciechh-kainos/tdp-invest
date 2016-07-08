define(['angular', 'application/tdpInvestModule'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainViewController", function ($scope, stockData) {
        $scope.test = "hello";
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
            series: [],
            title: {
                text: 'Hello'
            },
            useHighStocks: true
        };

        $scope.chartConfig.series.push({
                id: 1,
                data: stockData.getData()
            }
        );
    })

});