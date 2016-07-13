define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DataController", function($scope, $state) {

        $scope.$watch('receivedData', function() {
              //  console.log("hello");
              $scope.myVal = $scope.$parent.receivedData;
            })

    })
});
