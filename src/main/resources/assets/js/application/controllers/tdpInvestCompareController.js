define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestmentService'], function(angular, tdpInvestModule){
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpInvestmentService){
        var investments = tdpInvestmentService.getInvestmentSpecifications();

        var compareInvestment = function(dateStart, dateEnd, amount, annualRate){
            return tdpInvestmentService.getInvestmentTimeSeries(dateStart, dateEnd, amount, annualRate);
        };

        $scope.getInvestments = function(){
            return investments;
        };

        $scope.addInvestment = function(amount, annualRate){
            var len = investments.length;
            investments.push({id: len + 1, amount: amount, annualRate: annualRate})
        };

        $scope.delInvestment = function(id){
            if (investments.length > 0) {
                var invId = getInvestmentIndex(id);
                if (invId > -1){
                    investments.splice(invId, 1);
                }
            }
        };

        var getInvestmentIndex = function(arrId){
            return investments.map(function(x){ return x.id; }).indexOf(arrId);
        };
    });
});