define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestAuthService'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestLoginController", function ($scope, $rootScope, $location, $stateParams, tdpInvestAuthService) {

        tdpInvestAuthService.clearCredentials();

        $scope.login = function () {
            $scope.loginPromise = tdpInvestAuthService.login($scope.username, $scope.password)
                .then(function (response) {
                    if (response.success) {
                        $location.path('/tdp');
                    } else {
                        $scope.error = response.message;
                    }
                });
        };

    });
});
