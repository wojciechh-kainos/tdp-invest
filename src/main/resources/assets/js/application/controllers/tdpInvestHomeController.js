define(['angular', 'application/tdpInvestModule'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestHomeController", function ($scope, stockData) {
        $scope.funds = stockData.getFunds();
    })
});
    