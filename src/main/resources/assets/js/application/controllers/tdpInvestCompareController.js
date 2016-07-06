define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule){
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams){
        var investments = [
            {id: 0, name: "first", val: 1},
            {id: 1, name: "second", val: 2},
            {id: 2, name: "third", val: 3},
            {id: 3, name: "fourth", val: 4}
        ];

        $scope.getInvestments = function(){
            return investments;
        }

        $scope.addInvestment = function(name, val){
            var len = investments.length;
            investments.push({id: len + 1, name: name, val: val})
        }

        $scope.delInvestment = function(id){
            if (investments.length > 0) {
                var invId = getInvestmentIndex(id);
                if (invId > -1){
                    investments.splice(invId, 1);
                }
            }
        }

        var getInvestmentIndex = function(arrId){
            return investments.map(function(x){ return x.id; }).indexOf(arrId);
        }
    })
})