define(['angular', 'stubUnitData', 'angularMocks', 'application/controllers/tdpInvestCompareController', 'application/services/tdpChartConfigFactory', 'application/services/tdpUnitService'], function (angular, stubUnitData) {

    describe('tdpInvestCompareController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var deferred;
        var scope;
        var $q;
        var tdpInvestCompareController;
        var chartConfigFactorySpy;
        var tdpUnitService;

        beforeEach(inject(function ($controller, _$q_, _$rootScope_, _tdpUnitService_) {
            $q = _$q_;
            scope = _$rootScope_.$new();
            deferred = $q.defer();
            chartConfigFactorySpy = jasmine.createSpy('chartConfigFactorySpy').and.returnValue({xAxis: {categories: []}, series: []});
            tdpUnitService = _tdpUnitService_;

            spyOn(tdpUnitService, 'getAllWithinRange').and.returnValue(deferred.promise);
            spyOn(tdpUnitService, 'getAll').and.returnValue(deferred.promise);

            $controller('tdpInvestCompareController', { $scope: scope, ChartConfigFactory: chartConfigFactorySpy, tdpUnitService: tdpUnitService});
        }));

        describe('When updating chart with dates', function () {

            it('data should be updated' , function () {
                deferred.resolve({plain: function() {return stubUnitData.getDataWithinRange();}});

                scope.updateChart(885510000000, 885942000000);
                scope.$apply();

                expect(scope.chartConfig.series[0].data.length).toEqual(stubUnitData.getDataWithinRange().length);
                expect(scope.chartConfig.xAxis.categories[0]).toEqual('23/1/1998');
            });

        });

        describe('When updating chart without dates', function () {

            it('data should be updated' , function () {
                deferred.resolve({plain: function() {return stubUnitData.getData();}});

                scope.updateChart();
                scope.$apply();

                expect(scope.chartConfig.series[0].data.length).toEqual(stubUnitData.getData().length);
                expect(scope.chartConfig.xAxis.categories[0]).toEqual('22/1/1998');
            });

        });

    });
});