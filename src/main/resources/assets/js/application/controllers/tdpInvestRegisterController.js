define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService', 'application/services/tdpUserService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestRegisterController", function($scope, $state, tdpUserService) {
        $scope.register = function() {
            tdpUserService.register($scope.user)
                .then(function () {
                    $state.go('tdp.login');

                }, function () {
                    $scope.error = true;
                });
        };
  });
});
