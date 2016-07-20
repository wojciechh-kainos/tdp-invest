define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestDateController", function($scope, $state, $filter) {

        $scope.$watch('startDated', function() {
            var date = $filter('date')($scope.startDated, "yyyy-MM-dd")
            $scope.$parent.startDate = date;
        })

        $scope.$watch('endDated', function() {
            var date = $filter('date')($scope.endDated, "yyyy-MM-dd")
            $scope.$parent.endDate = date;
        })
    });
});
