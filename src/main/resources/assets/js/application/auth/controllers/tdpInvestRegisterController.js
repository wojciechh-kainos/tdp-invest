define(['angular', 'application/auth/tdpInvestAuthModule', 'application/auth/services/tdpInvestAuthService'], function (angular, tdpInvestAuthModule) {
    tdpInvestAuthModule.controller("tdpInvestRegisterController", function ($scope, tdpInvestAuthService, $state) {

        $scope.register = function () {
            $scope.registerPromise = tdpInvestAuthService.register($scope.username, $scope.password)
                .then(function () {
                    $state.go('login');
                }, function (response) {
                    $scope.error = response.message;
                });
        };
    });
});
