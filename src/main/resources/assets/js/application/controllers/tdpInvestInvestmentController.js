define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule){
    tdpInvestModule.controller("tdpInvestInvestmentController", function($scope, $stateParams){
        $scope.investmentId = $stateParams.investmentId;
        $scope.getInvestmentId = function() {
            return $scope.investmentId;
        }
    })
})