define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestStockDataService', 'ui-bootstrap'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", ['$scope', '$stateParams', 'stockData', '$state', function ($scope, $stateParams, stockData, $state) {
        $scope.data = stockData.getData();

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.format = 'yyyy-MM-dd';
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

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
                    pointFormat: "Value: {point.y:.2f} "
                }
            },
            series: [],
            useHighStocks: true
        };

        $scope.chartConfig.series.push({
            id: 1,
            data: $scope.data
        });


        $scope.submit = function () {
            $state.go('.calculated');
        };

    }]);

});
