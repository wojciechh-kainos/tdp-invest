define(['angular', 'application/tdpInvestModule', 'application/services/tdpAuthService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestRegisterController", function($location, $scope, tdpAuthService) {

        $scope.register = function() {
            $scope.dataLoading = true;
            tdpAuthService.Register($scope.user.username, $scope.user.password)
                .then(function(response) {
                    if(response.success) {
                        tdpAuthService.SetCredentials($scope.user.username, $scope.user.password);
                        $location.path('/tdp');
                    } else {
                        $scope.dataLoading = false;
                        $scope.error = "Registration failed.";
                    }
                });
        }
    });
});
