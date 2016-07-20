define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestButtonController", function($scope, $state, tdpInvestDataService) {

        var dataUrl = "/api/rows/get";

        $scope.submitRequest = function() {
                tdpInvestDataService.getRows(dataUrl, $scope.$parent.startDate, $scope.$parent.endDate)
                .then(function(response) {
                    $scope.$parent.receivedData = response.data;
                     if($state.current.name == "root.compare"){
                        var input = $scope.$parent.input;
                        var receivedData = $scope.$parent.receivedData
                        var result = tdpInvestDataService.calculateFundIncome(input,receivedData);
                        $scope.$parent.dataFund = result;
                        var percentage = $scope.$parent.percentage;
                        result = tdpInvestDataService.calculateInvestIncome(percentage,input,receivedData);
                        $scope.$parent.dataInvest = result;
                     };

                }, function(error) {
                    alert("Error! ButtonController")
                });
            }
    });
});
