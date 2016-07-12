define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("IndexController", function($rootScope,$scope, $state) {

        $scope.startDate = $state.current.data.endDate;
        $scope.endDate = $state.current.data.endDate;
    });
});
