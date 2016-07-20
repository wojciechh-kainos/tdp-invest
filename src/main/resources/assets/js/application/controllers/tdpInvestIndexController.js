define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestIndexController", function($scope, $state) {

        console.log("Entered tdp-invest-application");

        $scope.startDate = new Date("2010/05/03");
        $scope.endDate = new Date("2013/05/03");
        $scope.receivedData = [];
        $scope.input = 100;
        $scope.percentage = 2;
        $scope.dataFund = [];
        $scope.dataInvest = [];

    });
});
