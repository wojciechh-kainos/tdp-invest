define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestDateController", function($scope, $state, $filter) {

        $scope.startDated = $scope.$parent.startDate;
        $scope.endDated = $scope.$parent.endDate;

        $scope.$watch('startDated', function() {
            $scope.$parent.startDate = $filter('date')($scope.startDated, "yyyy-MM-dd");
        })

        $scope.$watch('endDated', function() {
            $scope.$parent.endDate = $filter('date')($scope.endDated, "yyyy-MM-dd")
        })
    });
});
