define(['angular', 'application/tdpInvestModule', 'application/services/tdpUserService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestLoginController", function($scope, $stateParams, tdpUserService) {
        // TODO: read this data from form in LoginController
        tdpUserService.login(user, password, this);
    });
});
