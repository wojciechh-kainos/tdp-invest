define(['angular', 'application/tdpInvestModule'], function (angular, tdpInvestModule) {
    tdpInvestModule.directive("tdpInvestNavbarDirective", function () {
        return {
            restrict: "E",
            templateUrl: 'html/partials/tdp-invest-navbar.html'
        };
    });
    return tdpInvestModule;
});
