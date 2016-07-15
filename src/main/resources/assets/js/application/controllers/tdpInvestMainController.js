define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpCompareService) {

$scope.getStockData = function(date1, date2) {
            tdpCompareService.getDataRange(date1, date2)
                .then(function(response) {
                    $scope.stockData = response.data;
                });
        }

    });
});