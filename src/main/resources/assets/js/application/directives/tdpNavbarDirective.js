define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
  tdpInvestModule.directive('tdpNavbar', function(tdpAuthenticationService, $state) {
    return {
      restrict: 'E',
      scope: {
        fieldname: '@'
      },
      templateUrl: 'html/partials/tdp-invest-navbar-template.html',
      link: function (scope, element, attributes) {
        scope.logout = function() {
            tdpAuthenticationService.clearCredentials();
            $state.go('tdp.home');
        }
        scope.$watch(tdpAuthenticationService.isUserLoggedIn, function(newVal) {
            scope.user = tdpAuthenticationService.getCurrentUser();
        });
      },
    };
  });
});