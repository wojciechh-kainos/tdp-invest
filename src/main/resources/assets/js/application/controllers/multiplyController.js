define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("multiplyController", function($scope) {
        $scope.qty = 1;
        $scope.cost = 1;
        $scope.result = function() { $scope.res = $scope.qty * $scope.cost  }
    });
});
