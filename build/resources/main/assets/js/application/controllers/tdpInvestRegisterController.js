define(['angular', 'application/tdpInvestModule', 'application/services/tdpUserService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestRegisterController", function($location, $scope, tdpUserService) {

        $scope.register = function() {
            $scope.dataLoading = true;
            tdpUserService.Create($scope.user)
                .then(function(response) {
                    if(response.success) {
                        $location.path('/login');
                    } else {
                        $scope.dataLoading = false;
                        $scope.error = "Registration failed.";
                    }
                });
        }
    });
});
