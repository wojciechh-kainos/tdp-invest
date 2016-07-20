define(['angular', 'auth/tdpInvestAuthModule', 'auth/services/tdpInvestAuthService'], function (angular, tdpInvestAuthModule) {
    tdpInvestAuthModule.controller("tdpInvestLoginController", function ($scope, tdpInvestAuthService, $window) {

        tdpInvestAuthService.clearCredentials();

        $scope.login = function () {
            $scope.loginPromise = tdpInvestAuthService.login($scope.username, $scope.password)
                .then(function (response) {
                    if (response.success) {
                            $window.location.href = "/";
                    } else {
                        $scope.error = response.message;
                    }
                });
        };

    });
});
