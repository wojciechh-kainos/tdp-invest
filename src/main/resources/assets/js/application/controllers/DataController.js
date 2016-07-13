define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DataController", function($scope, $state) {

        $scope.$watch('receivedData', function() {
              //  console.log("hello");
              $scope.myData = $scope.$parent.receivedData;
              var Data = $scope.$parent.receivedData;
              var keys = [];

              if(Data.length != 0)keys = Object.getOwnPropertyNames(Data[0]);
              $scope.columns = keys;

            })

    })
});
