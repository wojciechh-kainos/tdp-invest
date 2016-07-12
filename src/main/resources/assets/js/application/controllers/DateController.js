define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DateController", function($scope, $state, $filter, DataService, dataUrl) {

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
