define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.directive('tdpTable', function() {
            var controller = ['$scope', function($scope) {

                $scope.$watch('stockData', function(){
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
                        });
            }];

        return {
            templateUrl: 'html/partials/tdp-invest-table.html',
            controller: controller,
            scope: {
            stockData: "="
            }
        };
    });
});