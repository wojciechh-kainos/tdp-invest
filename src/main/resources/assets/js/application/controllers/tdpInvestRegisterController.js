define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestAuthService'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestRegisterController", function ($scope, tdpInvestAuthService, $state) {

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
