define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("ButtonController", function($scope, $state, DataService, dataUrl) {

        $scope.submitRequest = function() {
            if(dataUrl == "/api/rows/get/data") {
                DataService.getRowsForHome(dataUrl, $state.current.data.startDate, $state.current.data.endDate)
                .then(function(response) {
                    $state.current.data.receivedData = response.data;
                }, function(error) {
                    alert("Error! ButtonController")
                });
            } else {
                DataService.getRowsForCompare(dataUrl, $state.current.data.startDate, $state.current.data.endDate,
                                                $state.current.data.input, $state.current.data.percentage).then(function(response) {
                     $state.current.data.receivedData = response.data;
                      }, function(error) {
                              alert("Error! ButtonController")
                      });
            }
            $scope.test = $state.current.data.receivedData;
        }
    });
});
