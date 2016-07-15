define(['angular', 'application/tdpInvestModule', 'application/services/tdpAuthService'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestLoginController", function ($scope, $rootScope, $location, $stateParams, tdpAuthService) {

        tdpAuthService.ClearCredentials();

        $scope.login = function () {
            $scope.loginPromise = tdpAuthService.Login($scope.username, $scope.password)
                .then(function (response) {
                    if (response.success) {
                        tdpAuthService.SetCredentials($scope.username, $scope.password);
                        $location.path('/tdp');
                    } else {
                        $scope.error = response.message;
                    }
                });
        };

    });
});
