define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope) {

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
                }
            },
            series: [{
                         data: input_data
                      }],
            title: {
                text: 'Hello'
            },
            useHighStocks: true
        }

    });
});
