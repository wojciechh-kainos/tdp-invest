define(['angular', 'angularMocks', 'application/controllers/chartController'], function(angular) {

    describe('chartController', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $controller;
        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));

        var type = 'spline';

        describe('$scope.chartConfig.options.chart.type', function() {
            it('is being set to a proper value', function() {
                var $scope = {};
                var controller = $controller('chartController', { $scope: $scope });
                expect($scope.chartConfig.options.chart.type).toEqual(type);
            });
        });

    });
});

