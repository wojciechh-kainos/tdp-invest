define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("ButtonController", function($scope, $state, DataService, dataUrl) {

        $scope.submitRequest = function() {
                DataService.getRows(dataUrl, $scope.$parent.startDate, $scope.$parent.endDate)
                .then(function(response) {
                    $scope.$parent.receivedData = response.data;
                }, function(error) {
                    alert("Error! ButtonController")
                });
            }
    });
});
