define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpInvestCompareService) {

$scope.getStockData = function(date1, date2) {
            tdpInvestCompareService.getDataRange(date1, date2)
                .then(function(response) {
                    $scope.stockData = response.data;
                });
        }

    });
});