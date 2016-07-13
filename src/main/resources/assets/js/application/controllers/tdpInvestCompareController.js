define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestStockDataService', 'application/services/tdpInvestCompareService', 'ui-bootstrap'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", ['$scope', '$stateParams', 'stockData', 'compareData', function($scope, $stateParams, stockData, compareData) {
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

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
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
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        function formatData(data) {
            var curr_date = data.getDate();
            var curr_month = data.getMonth() + 1;
            var curr_year = data.getFullYear();
            if (curr_month <= 9) curr_month = "0" + curr_month;
            if (curr_date <= 9) curr_date = "0" + curr_date;

            return curr_date + "/" + curr_month + "/" + curr_year;
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


        $scope.submit = function() {
            var compareDataConfig = {
                start_date: formatData($scope.start_date),
                end_date: formatData($scope.end_date),
                value_investment: $scope.value_investment,
                value_capitalization: $scope.value_capitalization,
                value_percentage: $scope.value_percentage
            }

            compareData.setConfig(compareDataConfig);
            compareData.refresh();

            var calculated = JSON.parse(JSON.stringify( $scope.data )); // copy array

            calculated[0][1] = $scope.value_investment;

            calculated.forEach(function(element, index, array) {
                if(index == 0) return;
                calculated[index][1] = calculated[index - 1][1] + 0.01;
            });

            $scope.chartConfig.series.push({
                id: 2,
                data: calculated
            });
        };
        
    }]);

});