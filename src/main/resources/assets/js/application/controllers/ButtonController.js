define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("ButtonController", function($scope, $state, DataService, dataUrl) {

        $scope.submitRequest = function() {
                DataService.getRows(dataUrl, $scope.$parent.startDate, $scope.$parent.endDate)
                .then(function(response) {
                    $scope.$parent.receivedData = response.data;
                     if($state.current.name == "root.compare"){
                        var input = $scope.$parent.input;
                        var receivedData = $scope.$parent.receivedData
                        var result = DataService.calculateFundIncome(input,receivedData);
                        $scope.$parent.dataFund = result;
                        var percentage = $scope.$parent.percentage;
                        result = DataService.calculateInvestIncome(percentage,input,receivedData);
                        $scope.$parent.dataInvest = result;
                     };

                }, function(error) {
                    alert("Error! ButtonController")
                });
            }
    });
});
