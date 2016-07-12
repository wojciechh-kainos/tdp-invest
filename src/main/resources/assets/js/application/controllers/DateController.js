define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DateController", function($scope, $state, $filter, DataService, dataUrl) {

        $scope.$watch('startDate', function() {
            var date = $filter('date')($scope.startDate, "yyyy-MM-dd")
            $state.current.data.startDate = date;
        })

        $scope.$watch('endDate', function() {
            var date = $filter('date')($scope.endDate, "yyyy-MM-dd")
            $state.current.data.endDate = date;
        })
    });
});
