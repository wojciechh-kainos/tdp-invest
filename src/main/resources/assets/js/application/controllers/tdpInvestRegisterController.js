define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService', 'application/services/tdpUserService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestRegisterController", function($scope, $state, tdpUserService, toastr) {
        $scope.register = function() {
            tdpUserService.register($scope.user)
                .then(function () {
                    toastr.success('Your account has been created! Please log in.', 'Success');
                    $state.go('tdp.login');
                }, function () {
                    $scope.error = true;
                });
        };
  });
});
