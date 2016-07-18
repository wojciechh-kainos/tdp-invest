define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DataController", function($scope, $state) {

        $scope.$watch('receivedData', function() {
              $scope.myData = $scope.$parent.receivedData;
              var Data = $scope.$parent.receivedData;

              for(var i = 0 ; i < Data.length ; i++){
                    Data[i].incomeFromFund = $scope.$parent.dataFund[i];
                    Data[i].incomeFromInvestment = $scope.$parent.dataInvest[i];
                    }

              var keys = [];
              if(Data.length != 0)keys = Object.getOwnPropertyNames(Data[0]);
              $scope.dateIndex = keys.indexOf("date");
              $scope.columns = keys;
              if($state.current.name == "root.home"){
                $scope.state = "root.home";
                $scope.valIndex = keys.indexOf("value");
              }
              else {
                 $scope.state = "root.compare";
                 $scope.fundIndex = keys.indexOf("incomeFromFund");
                 $scope.investIndex = keys.indexOf("incomeFromInvestment");
              }
            })

    })
});