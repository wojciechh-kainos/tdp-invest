define(['angular', 'application/auth/tdpInvestAuthModule', 'application/auth/services/tdpInvestAuthService'], function (angular, tdpInvestAuthModule) {
    tdpInvestAuthModule.controller("tdpInvestRegisterController", function ($scope, tdpInvestAuthService, $state) {

        $scope.register = function () {
            $scope.registerPromise = tdpInvestAuthService.register($scope.username, $scope.password)
                .then(function (response) {
                    if (response.success) {
                        $state.go('login');
                    }
                    else {
                        $scope.error = response.message;
                    }
                });
        }
    });
});
