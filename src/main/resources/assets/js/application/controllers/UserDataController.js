define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("UserDataController", function($scope, $state, DataService, dataUrl) {

        $scope.$watch('input', function() {
            $scope.$parent.input = $scope.input;
        })

        $scope.$watch('percentage', function() {
            $scope.$parent.percentage = $scope.percentage;
        })
    });
});
