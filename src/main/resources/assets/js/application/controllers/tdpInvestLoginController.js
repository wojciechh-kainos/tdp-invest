define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestAuthService'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestLoginController", function ($scope, $rootScope, $stateParams, tdpInvestAuthService, $state) {

        tdpInvestAuthService.clearCredentials();

        $scope.login = function () {
            $scope.loginPromise = tdpInvestAuthService.login($scope.username, $scope.password)
                .then(function (response) {
                    if (response.success) {
                        $state.go('tdp');
                    } else {
                        $scope.error = response.message;
                    }
                });
        };

    });
});
