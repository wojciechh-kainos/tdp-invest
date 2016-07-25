define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestLoginController", function($scope, $state, tdpAuthenticationService, toastr) {
        $scope.login = function() {
            tdpAuthenticationService.login($scope.username, $scope.password)
                .then(function () {
                   tdpAuthenticationService.setCredentials($scope.username, $scope.password);
                   $state.go('tdp.home');
               }, function() {
                   $scope.error = true;
               });
        };
  });
});