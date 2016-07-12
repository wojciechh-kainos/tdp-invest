define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("IndexController", function($scope, $state) {

        $scope.startDate = new Date(2013/05/03);
        $scope.endDate= new Date(2013/05/03);
        $scope.receivedData;
        $scope.input = 100;
        $scope.percentage = 2;

    });
});
