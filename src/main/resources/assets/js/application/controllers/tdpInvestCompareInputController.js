define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareInputController", function($scope, $state) {

        $scope.$watch('input', function() {
            $scope.$parent.input = $scope.input;
        })

        $scope.$watch('percentage', function() {
            $scope.$parent.percentage = $scope.percentage;
        })
    });
});
