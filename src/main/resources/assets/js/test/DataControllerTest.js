define( ['angular' , 'angularMocks' , 'application/controllers/DataController'], function(angular){

    describe('DataController', function() {

        beforeEach (angular.mock.module('TdpInvestModule'));

        var controller;

        beforeEach (inject (function (controller) {
            controller = _controller_;
        }));

        describe('Data tests', function(){
            var $scope, controller;

            beforeEach(function() {
                $scope = {};
                controller = controller('DataController', { $scope: $scope});
            });

            it('checks if right state is chosen', function() {
                $scope.currentState = "root.home";

                $scope.$apply();
                expect($scope.state).toEqual("root.home");
            });
        });
    });
});