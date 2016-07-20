define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestmentService', 'ng-table'], function(angular, tdpInvestModule){
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpInvestmentService, NgTableParams){

        $scope.tableConfig = new NgTableParams({
            count: 20
        }, {
            counts: [],
            getData: function(){
                return getInvestments();
            }
        });

        // // var compareInvestment = function(dateStart, dateEnd, amount, annualRate){
        // //     return tdpInvestmentService.getInvestmentTimeSeries(dateStart, dateEnd, amount, annualRate);
        // };
        
        var getInvestments = function(){
            return tdpInvestmentService
                .getInvestments()
                .then(function(response){
                    return response.data;
                });
        };

        $scope.showDate = function(ms){
          return new Date(ms).toISOString().slice(0, 10);
        };
        
        $scope.showAmount = function(row){
            return "$" + row.amount.toFixed(2);
        };
        
        $scope.showRate = function(row){
            return (row.annualRate * 100).toFixed(2) + "%";
        };


        $scope.removeRow = function(dbId){
            tdpInvestmentService.deleteInvestment(dbId).then(function (success) {
                $scope.tableConfig.reload();
            });
        };

        $scope.saveRow = function(row, dbId){
            var investment = mergeObjects(dbId, row);
        };

        $scope.addRow = function(){
            var investment = {amount: null, annualRate: null, startDate: null, endDate: null};
            tdpInvestmentService.postInvestment(investment).then(function(success){
                $scope.tableConfig.reload();
            });
        };

        var mergeObjects = function(id, row){
            var idObj = {id: id};
            Object.keys(row).forEach(function(key){ idObj[key] = row[key]; });

            return idObj;
        };
        

        // var getInvestmentIndex = function(arrId){
        //     return investments.map(function(x){ return x.id; }).indexOf(arrId);
        // };
    });
});