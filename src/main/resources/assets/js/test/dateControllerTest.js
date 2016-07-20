define( ['angular' , 'angularMocks' , 'application/controllers/tdpInvestDateController'], function(angular){

    describe('tdpInvestDateController', function() {

        beforeEach (angular.mock.module('tdpInvestModule'));

        var $controller;
        var $scope;

        beforeEach (inject (function (_$controller_, _$rootScope_) {
            $controller = _$controller_;

            _$rootScope_.input = 100;
            _$rootScope_.percentage = 5;

            $scope = _$rootScope_.$new();
        }));

        describe('Check if controller', function(){
            beforeEach(function() {
                $controller('tdpInvestDateController', { $scope: $scope });
            });

            it('has variables properly initialized from parent', function() {
                expect($scope.input).toEqual(100);
                expect($scope.percentage).toEqual(5);
            });

            it('has variables the same as parent', function() {
                expect($scope.input).toEqual($scope.$parent.input);
                expect($scope.percentage).toEqual($scope.$parent.percentage);
            });

//            it('runs function after $apply() invotaion and changes input', function() {
//                $scope.input = 200;
//                $scope.$apply();
//                expect($scope.input).toEqual($scope.$parent.input);
//            });
//
//            it('runs function after $apply() invocation and changes percentage', function() {
//                $scope.percentage = 10;
//                $scope.$apply();
//                expect($scope.percentage).toEqual($scope.$parent.percentage);
//            });
        });
    });
});