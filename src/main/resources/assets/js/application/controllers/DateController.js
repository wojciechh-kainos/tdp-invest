define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DateController", function($scope, $state, DataService, dataUrl) {

        $scope.$watch('startDate', function() {
            $state.current.data.startDate = $scope.startDate;
        })

        $scope.$watch('endDate', function() {
            $state.current.data.endDate = $scope.endDate;
        })
    });
});
