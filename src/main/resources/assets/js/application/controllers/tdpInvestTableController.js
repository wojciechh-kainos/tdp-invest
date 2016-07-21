define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestTableController", function($scope, $state) {

            $scope.$parent.receivedData = [];

            $scope.$watch('receivedData', function() {
              var data = $scope.$parent.receivedData;
              $scope.currentStateName = $state.current.name;

              for(var i = 0 ; i < data.length ; i++) {
                    data[i].incomeFromFund = $scope.$parent.dataFund[i];
                    data[i].incomeFromInvestment = $scope.$parent.dataInvest[i];
              }

              var keys = [];
              if(data.length != 0) {
                keys = Object.getOwnPropertyNames(data[0]);
              }

              $scope.dateIndex = keys.indexOf("date");
              $scope.columns = keys;

              $scope.valIndex = keys.indexOf("value");
              $scope.fundIndex = keys.indexOf("incomeFromFund");
              $scope.investIndex = keys.indexOf("incomeFromInvestment");

            })
    })
});
