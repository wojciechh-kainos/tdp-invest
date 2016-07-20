define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService', 'application/services/tdpUserService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestRegisterController", function($scope, $state, tdpUserService) {
        $scope.register = function() {
            tdpUserService.register($scope.user)
                .then(function (response) {
                    if (response.success) {
                        //FlashService.Success('Registration successful', true);
                        $state.go('tdp.login');
                    } else {

                    }
                });
        };
  });
});
