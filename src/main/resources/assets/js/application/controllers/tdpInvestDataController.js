define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestDataController", function($scope, $state) {

        $scope.$watch('receivedData', function() {
              var data = $scope.$parent.receivedData;

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

              if($state.current.name == "root.home") {
                $scope.state = "root.home";
                $scope.valIndex = keys.indexOf("value");
              } else {
                 $scope.state = "root.compare";
                 $scope.fundIndex = keys.indexOf("incomeFromFund");
                 $scope.investIndex = keys.indexOf("incomeFromInvestment");
              }
            })
    })
});
