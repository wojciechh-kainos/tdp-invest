define(['angular', 'application/tdpInvestModule', 'ui-bootstrap', 'application/services/tdpInvestCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.directive('tdpAdd', function() {
        var controller = ['$scope', function($scope) {



        }];
        return {
            templateUrl: 'html/partials/tdp-invest-add.html',
            controller: controller
            }

    });
});