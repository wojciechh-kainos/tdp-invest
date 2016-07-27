define(['angular', 'stubUnitData', 'angularMocks', 'application/controllers/tdpInvestHomeController',
 'application/services/tdpUnitService', 'application/services/tdpChartConfigFactory'], function (angular, stubUnitData) {

    describe('tdpInvestHomeController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var deferred;
        var scope;
        var $q;
        var tdpUnitService;

        beforeEach(inject(function ($controller, _$rootScope_, _$q_, _tdpUnitService_, _ChartConfigFactory_, _NgTableParams_) {
            $q = _$q_;
            scope = _$rootScope_.$new();
            deferred = $q.defer();
            tdpUnitService = _tdpUnitService_;
            spyOn(tdpUnitService, 'getAll').and.returnValue(deferred.promise);
            spyOn(tdpUnitService, 'getAllWithinRange').and.returnValue(deferred.promise);
            ChartConfigFactory = jasmine.createSpy('ChartConfigFactory');

            $controller('tdpInvestHomeController', {$scope: scope, tdpUnitService: tdpUnitService, ChartConfigFactory: _ChartConfigFactory_, NgTableParams: _NgTableParams_});
        }));

        describe('When updating chart', function () {
            it('with with no range set should get all', inject(function () {
                deferred.resolve({plain: function() { return stubUnitData.getData();}});

                scope.updateChart();
                scope.$apply();

                expect(scope.chartConfig.series[0].data.length).toEqual(6);
                expect(tdpUnitService.getAll).toHaveBeenCalled();
            }));

            it('with with given range should get range', inject(function () {
                deferred.resolve({plain: function() { return stubUnitData.getDataWithinRange();}});

                scope.updateChart(885510000000, 884127600000);
                scope.$apply();

                expect(scope.chartConfig.series[0].data.length).toEqual(3);
                expect(tdpUnitService.getAllWithinRange).toHaveBeenCalled();
            }));

        });
    });
});