define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestPersonController", function($scope, $stateParams) {
        $scope.personId = $stateParams.personId;
        $scope.personName = '';
        $scope.personId = '';
        $scope.getPersonId = function() {
            return $scope.personId;
        };
    });
});
