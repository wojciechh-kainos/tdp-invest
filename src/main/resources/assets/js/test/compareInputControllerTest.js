define( ['angular' , 'angularMocks' , 'application/controllers/tdpInvestCompareInputController'], function(angular){

    describe('tdpInvestCompareInputController', function() {

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
                $controller('tdpInvestCompareInputController', { $scope: $scope });
            });

            it('has variables properly initialized from parent', function() {
                expect($scope.input).toEqual(100);
                expect($scope.percentage).toEqual(5);
            });

            it('has variables the same as parent', function() {
                expect($scope.input).toEqual($scope.$parent.input);
                expect($scope.percentage).toEqual($scope.$parent.percentage);
            });

            it('runs function after $digest() invocation and changes input', function() {
                $scope.input = 200;
                $scope.$digest();
                expect($scope.input).toEqual($scope.$parent.input);
            });

            it('runs function after $digest() invocation and changes percentage', function() {
                $scope.percentage = 10;
                $scope.$digest();
                expect($scope.percentage).toEqual($scope.$parent.percentage);
            });
        });
    });
});