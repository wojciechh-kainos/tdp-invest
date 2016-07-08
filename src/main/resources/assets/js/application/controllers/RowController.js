define(['angular', 'application/tdpInvestModule', 'application/services/RowService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("RowController", function($scope, RowService) {
        RowService.getRows()
            .then(function(response) {
                $scope.message = response.data[0].date;
            }, function(error) {
                $scope.message = error;
            });

    });
});
