define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DataController", function($scope, $state, DataService) {
        DataService.getRows($state.current.name)
            .then(function(response) {
            $scope.message = response.data;
                $scope.data = response.data;
                $scope.cols = Object.keys($scope.data[0]);
            }, function(error) {
                $scope.message = error;
            });
    })
});
