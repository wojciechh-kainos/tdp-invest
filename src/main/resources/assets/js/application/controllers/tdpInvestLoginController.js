define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestLoginController", function($scope, $state, tdpAuthenticationService, toastr) {
        (function initController() {
            // reset login status
            tdpAuthenticationService.clearCredentials();
        })();

        $scope.login = function() {
            tdpAuthenticationService.login($scope.username, $scope.password, function (error) {
                if (error) {
                    $scope.error = true;
                }
            });
        };
  });
});