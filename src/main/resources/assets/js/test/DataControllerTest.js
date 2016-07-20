define( ['angular' , 'angularMocks' , 'application/controllers/DataController'], function(angular){

    describe('DataController', function() {

        beforeEach (angular.mock.module('tdpInvestModule'));

        var $controller;
        var $scope, $state;

        beforeEach (inject (function (_$controller_, _$rootScope_ , _$state_) {
            $controller = _$controller_;

            _$rootScope_.receivedData = [0];
            _$rootScope_.dataFund = [0];
            _$rootScope_.dataInvest = [0];

            $scope = _$rootScope_.$new();
            $state = _$state_;
        }));

        describe('Data tests', function(){
            var controller;

            beforeEach(function() {

                controller = $controller('DataController', { $scope: $scope, $state: $state});
            });

            it('checks if right state is chosen', function() {
                $state.transitionTo('root.home');
                $state.$apply();


                expect($scope.state).toEqual("root.home");
            });
        });
    });
});