define( ['angular' , 'angularMocks' , 'application/controllers/tdpInvestTableController'], function(angular){

    describe('tdpInvestTableController', function() {

        beforeEach (angular.mock.module('tdpInvestModule'));

        var $controller;
        var $scope;

        beforeEach (inject (function (_$controller_, _$rootScope_, _$state_) {
            $controller = _$controller_;
            _$rootScope_.receivedData = [ {"date":15,"value": 1 , "incomeFromFund": 2, "incomeFromInvestment": 7} ];
            _$rootScope_.dataFund = [2];
            _$rootScope_.dataInvest = [2];
            _$state_.current.name = "root.home";

            $state = _$state_;
            $scope = _$rootScope_.$new();
        }));

        describe('Check if controller', function(){
            beforeEach(function() {
                $controller('tdpInvestTableController', { $scope: $scope , $state: $state});
            });

            it('has variable receiveData properly initialized from parent', function() {
                expect($scope.receivedData[0]).toEqual({"date":15,"value": 1 , "incomeFromFund": 2, "incomeFromInvestment": 7});
            });

            it('sets index of date properly', function() {
                $scope.$digest();
                expect($scope.dateIndex).toEqual(0);
            });

            it('sets number of keys correctly', function() {
                $scope.$digest();
                expect($scope.columns.length).toEqual(4);
            });

            it('sets index of fundIncome correctly', function() {
                $scope.$digest();
                expect($scope.fundIndex).toEqual(2);
            });
            it('sets index of investIncome correctly', function() {
                $scope.$digest();
                expect($scope.investIndex).toEqual(3);
            });
            it('sets current state correctly', function() {
                $scope.$digest();
                expect($scope.currentStateName).toEqual("root.home");
            });
        });
    });
});