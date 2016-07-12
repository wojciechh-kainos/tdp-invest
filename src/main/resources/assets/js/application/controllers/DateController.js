define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DateController", function($scope, $state, DataService, dataUrl) {
        var bDate = $scope.beginDate;
        var eDate = $scope.endDate;

        $scope.$watch('beginDate', DataService.getRows(dataUrl));
    });
});
