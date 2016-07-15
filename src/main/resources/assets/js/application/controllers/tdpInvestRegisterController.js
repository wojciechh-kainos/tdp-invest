define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestAuthService'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestRegisterController", function ($location, $scope, tdpInvestAuthService) {

        $scope.register = function () {
            $scope.registerPromise = tdpInvestAuthService.register($scope.user.username, $scope.user.password)
                .then(function (response) {
                    if (response.success) {
                        tdpInvestAuthService.setCredentials($scope.user.username, $scope.user.password);
                        $location.path('/tdp');
                    }
                    else {
                        $scope.error = response.message;
                    }
                });
        }
    });
});
