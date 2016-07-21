define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
  tdpInvestModule.directive('tdpNavbar', function($rootScope, tdpAuthenticationService, $state) {
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
        scope.$watch('$root.' + attributes.fieldname, function(newVal) {
            scope.user = scope.$root[attributes.fieldname];
        });
      },
    };
  });
});