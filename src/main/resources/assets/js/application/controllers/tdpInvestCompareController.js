define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestStockDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", ['$scope', '$stateParams', 'stockData', function($scope, $stateParams, stockData) {
        $scope.data = stockData.getData();
        console.log('stage2');
        
    }]);

});