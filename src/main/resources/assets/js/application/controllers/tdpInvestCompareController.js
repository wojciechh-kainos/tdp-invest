define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpCompareService) {

        var initializeTable = function(response) {
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

        }

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
                console.log(response.data.price);
        });
    });
});