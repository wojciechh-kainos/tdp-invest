define(['angular', 'application/tdpInvestModule', 'application/services/tdpPersonService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestPersonController", function($scope, $stateParams, tdpPersonService) {
        // tdpPersonService.getPerson($stateParams.personId)
        //     .then(function(response) {
        //         $scope.message = response;
        //     }, function(error) {
        //         $scope.message = error;
        //     });

        tdpPersonService.createPerson({name: $stateParams.personId}).then(function(response){
            $scope.message = response.data.name;
        })
    });
});
