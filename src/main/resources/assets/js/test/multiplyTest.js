define(['angular', 'angularMocks', 'application/controllers/multiplyController'], function(angular) {

    describe('multiplyController', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $controller;
        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));


        describe('$scope.qty', function() {
            it('is being set to a proper value', function() {
                var qtyT = 1;
                var $scope = {};
                var controller = $controller('multiplyController', { $scope: $scope });
                $scope.qty = qtyT;
                expect($scope.qty).toEqual(qtyT);
            });
        });

        describe('$scope.cost', function() {
            it('is being set to a proper value', function() {
                var costT = 1;
                var $scope = {};
                var controller = $controller('multiplyController', { $scope: $scope });
                $scope.cost = costT;
                expect($scope.cost).toEqual(costT);
            });
        });

        describe('$scope.res', function() {
            it('is being set to a proper value', function() {
                var qtyT = 1;
                var costT = 2;
                var resT = 2;

                var $scope = {};
                var controller = $controller('multiplyController', { $scope: $scope });

                $scope.qty = qtyT;
                $scope.cost = costT;

                $scope.result();
                expect($scope.res).toEqual(resT);
            });
        });

        describe('Mock service', function() {
            it('is being set to a proper value', function() {
                var qtyT = 1;
                var costT = 2;
                var resT = 2;

                var $scope = {};
                var controller = $controller('multiplyController', { $scope: $scope });

                $scope.qty = qtyT;
                $scope.cost = costT;

                $scope.result();
                expect($scope.res).toEqual(resT);
            });
        });

    });
});

