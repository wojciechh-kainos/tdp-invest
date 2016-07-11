define(['angular', 'application/tdpInvestModule', 'application/services/tdpPersonService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestPersonController", function($scope, $stateParams, tdpPersonService) {
        tdpPersonService.getPerson($stateParams.personId)
            .then(function(response) {
                $scope.personId = response.data;
                $scope.message = response;
                done();
            }, function(error) {
                $scope.message = error;
            });

    });
});
