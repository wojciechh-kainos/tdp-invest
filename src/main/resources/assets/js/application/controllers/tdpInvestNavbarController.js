define(['angular', 'application/tdpInvestModule', 'application/services/tdpAuthService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestNavbarController", function($scope, $rootScope, tdpAuthService) {

        tdpAuthService.WatchAuthorizationStatus(function() {
            $scope.isUserLoggedIn = true;
        }, function() {
            $scope.isUserLoggedIn = false;
        })

    });
});
