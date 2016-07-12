define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("UserDataController", function($scope, $state, DataService, dataUrl) {

        $scope.$watch('input', function() {
            $state.current.data.input = $scope.input;
        })

        $scope.$watch('percentage', function() {
            $state.current.data.percentage = $scope.percentage;
        })
    });
});
