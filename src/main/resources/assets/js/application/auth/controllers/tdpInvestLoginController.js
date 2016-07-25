define(['angular', 'application/auth/tdpInvestAuthModule', 'application/auth/services/tdpInvestAuthService'], function (angular, tdpInvestAuthModule) {
    tdpInvestAuthModule.controller("tdpInvestLoginController", function ($scope, tdpInvestAuthService, $window) {

        tdpInvestAuthService.clearCredentials();

        $scope.login = function () {
            $scope.loginPromise = tdpInvestAuthService.login($scope.username, $scope.password)
                .then(function () {
                    $window.location.href = "/#/";
                }, function (response) {
                    $scope.error = response.message;
                });
        };
    });
});
