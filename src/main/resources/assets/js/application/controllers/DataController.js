define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DataController", function($scope, $state) {

        $scope.$watch('test', function() {

              $scope.myVal = $state.current.data.receivedData;
            })

    })
});
