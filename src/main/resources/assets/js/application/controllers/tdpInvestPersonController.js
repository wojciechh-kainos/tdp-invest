define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestPersonService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestPersonController", function($scope, $stateParams, tdpInvestPersonService) {
        tdpInvestPersonService.getPerson($stateParams.personId)
            .then(function(response) {
                $scope.personId = response.data;
                $scope.message = response;
                done();
            }, function(error) {
                $scope.message = error;
            });
    });
});
