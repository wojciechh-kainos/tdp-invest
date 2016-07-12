define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("IndexController", function($scope, $state, DataService, dataUrl) {
        $scope.value = "radsasd";
    });
});
