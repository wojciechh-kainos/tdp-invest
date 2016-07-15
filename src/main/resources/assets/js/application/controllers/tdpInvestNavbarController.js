define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestAuthService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestNavbarController", function($scope, $rootScope, tdpInvestAuthService) {

        tdpInvestAuthService.watchAuthorizationStatus(function() {
            $scope.isUserLoggedIn = true;
        }, function() {
            $scope.isUserLoggedIn = false;
        })

    });
});
