define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestAuthService'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestUpdateController", function ($scope, tdpInvestAuthService, $state) {
        $scope.showGif = false;
    });
});
