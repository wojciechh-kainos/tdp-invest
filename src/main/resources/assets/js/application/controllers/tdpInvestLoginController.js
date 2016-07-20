define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestLoginController", function($scope, $state, tdpAuthenticationService) {
        (function initController() {
            // reset login status
            tdpAuthenticationService.clearCredentials();
        })();

        $scope.login = function() {
            tdpAuthenticationService.login($scope.username, $scope.password).then( function () {
                tdpAuthenticationService.setCredentials($scope.username, $scope.password);
                $state.go('tdp');
            }, function() {
                $scope.error = true;
            });
        };
  });
});