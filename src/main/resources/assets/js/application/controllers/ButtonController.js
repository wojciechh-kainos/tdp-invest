define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("ButtonController", function($scope, $state, DataService, dataUrl) {

        $scope.submitRequest = function() {
            if(dataUrl == "/api/rows/get/data") {
                DataService.getRowsForHome(dataUrl, $scope.$parent.startDate, $scope.$parent.endDate)
                .then(function(response) {
                    $scope.$parent.receivedData = response.data;
                }, function(error) {
                    alert("Error! ButtonController")
                });
            } else {
                DataService.getRowsForCompare(dataUrl, $scope.$parent.startDate, $scope.$parent.endDate,
                                                $scope.$parent.input, $scope.$parent.percentage).then(function(response) {
                     $scope.$parent.receivedData = response.data;
                      }, function(error) {
                              alert("Error! ButtonController")
                      });
            }
             $scope.test = $scope.$parent.receivedData;
        }
    });
});
