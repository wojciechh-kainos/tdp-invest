define( ['angular' , 'angularMocks' , 'application/controllers/tdpInvestDateController'], function(angular){

    describe('tdpInvestDateController', function() {

        beforeEach (angular.mock.module('tdpInvestModule'));

        var $controller;
        var $scope;

        beforeEach (inject (function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
        }));

        describe('Check if controller', function(){
            beforeEach(function() {
                $controller('tdpInvestDateController', { $scope: $scope });
                $scope.startDated = new Date("11/11/2011");
                $scope.endDated = new Date("04/04/2004");
            });

            it('has variables properly initialized', function() {
                expect($scope.startDated).toEqual(new Date("11/11/2011"));
                expect($scope.endDated).toEqual(new Date("04/04/2004"));
            });

            it('formats and sets date properly after $digest() invocation', function() {
                $scope.$digest();
                expect($scope.$parent.startDate).toEqual("2011-11-11");
                expect($scope.$parent.endDate).toEqual("2004-04-04");
            });
        });
    });
});