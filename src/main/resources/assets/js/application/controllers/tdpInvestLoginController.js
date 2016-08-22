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

        $scope.events = [
            { id:1, text:"Task A-12458",
              start_date: new Date(2016, 06, 30, 9, 0),
              end_date: new Date(2016, 06, 30, 16, 0) },
            { id:2, text:"Task A-83473",
              start_date: new Date(2016, 06, 28, 9, 0),
              end_date: new Date(2016, 06, 30, 16, 0) }
          ];
  });
});