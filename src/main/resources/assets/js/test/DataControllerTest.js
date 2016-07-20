define( ['angular' , 'angularMocks' , 'application/controllers/DataController'], function(angular){
    describe('DataController', function() {
        beforeEach (angular.mock.module('tdpInvestModule'));

        var $controller, $scope;
        beforeEach (inject (function (_$rootScope_, _$controller_) {
            $controller = _$controller_;
            _$rootScope_.input = 100;
            _$rootScope_.dataFund = [1,2,3];
            _$rootScope_.dataInvest = [10,20,30];
            _$rootScope_.receivedData = [100,200,300];

            $scope = _$rootScope_.$new();
        }));

        describe('Data tests', function(){
            it('checks if $scope.input is equal to proper value', function() {
                var controller = $controller('DataController', {$scope: $scope});
                expect($scope.input).toEqual(100);
                $scope.$apply();
                expect($scope.myData).toEqual([100,200,300]);
                expect($scope.dateIndex).toEqual(keys.indexOf("date"));

            });
        });
    });
});