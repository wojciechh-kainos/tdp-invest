define(['angular', 'application/tdpInvestModule', 'application/services/tdpLoginService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestNavbarController", function($scope, $rootScope, tdpLoginService) {

        tdpLoginService.WatchAuthorizationStatus(function() {
            $scope.isUserLoggedIn = true;
        }, function() {
            $scope.isUserLoggedIn = false;
        })

    });
});
