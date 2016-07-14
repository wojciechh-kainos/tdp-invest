define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpCompareService) {

        $scope.start_date = new Date(2015, 7, 20);
                $scope.end_date = new Date();

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];

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



        var initializeTable = function() {
            $scope.sortType = 'price';
            $scope.reverse = false;
            $scope.sortTable = function(sortType) {
                if ($scope.sortType === sortType) {
                    $scope.reverse = !$scope.reverse;
                }
                $scope.sortType = sortType;
            }

            $scope.filteredStockData = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.maxSize = 5;

            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;

                $scope.filteredStockData = $scope.stockData.slice(begin, end);

            });
        };

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
        };

        var renderInfo = function(response) {
            $scope.stockData = response.data;
            $scope.prices = [];
            $scope.dates = [];
            for (i = 0; i < $scope.stockData.length; i++) {
                $scope.prices.push(parseFloat($scope.stockData[i].price));
                $scope.dates.push($scope.stockData[i].date)


            }
            initializeTable();
            initializeChart();
        }



        tdpCompareService.getDataRange($scope.start_date, $scope.end_date)
            .then(function(response) {
                renderInfo(response);
            });

        $scope.getStockData = function(date1, date2) {
            tdpCompareService.getDataRange(date1, date2)
                .then(function(response) {
                    renderInfo(response);
                });

        }
    });
});