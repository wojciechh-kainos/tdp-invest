define(['angular', 'angularMocks', 'application/controllers/tdpInvestFrontController', 'application/services/tdpDataService', 'application/services/tdpChartService'], function (angular) {

    describe('tdpInvestFrontController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var dataService;
        var deferred;
        var $scope;

        var allData = {
        data : [
                {
                    date : {
                        dayOfMonth : 5,
                        dayOfWeek : "FRIDAY",
                        dayOfYear : 310,
                        month : "NOVEMBER",
                        monthValue: 11,
                        year: 2004
                    },
                    value : 120
                },
                {
                    date : {
                        dayOfMonth : 3,
                        dayOfWeek : "THURSDAY",
                        dayOfYear : 308,
                        month : "NOVEMBER",
                        monthValue: 11,
                        year: 2004
                    },
                    value : 120
                }
               ]
        };

        var expectedData = allData.data;
        var expectedFilteredData = [allData.data[0]];

        beforeEach(inject(function ($controller, _$rootScope_, tdpDataService, tdpChartService, $q) {
            deferred = $q.defer();
            $scope = _$rootScope_.$new();
            dataService = tdpDataService;
            chartService = tdpChartService;

            spyOn(dataService, 'getInvestData').and.returnValue(deferred.promise);
            var controller = $controller('tdpInvestFrontController', {$scope: $scope, tdpDataService: dataService});
            spyOn(chartService, 'createChart').and.callFake(function(){});
        }));

        describe('When getting data from service', function () {
            it('should show expected table', function () {
                deferred.resolve(allData);
                $scope.$apply();
                expect($scope.dataForView).toEqual(expectedData)
            });
        });

        describe('When submitting form of select date range', function () {
            it('should show expected filtered table', function () {
                deferred.resolve(allData);
                $scope.$apply();

                $scope.startDate = "Thu Nov 04 2004 00:00:00 GMT+0100 (CET)";
                $scope.endDate ="Sun Nov 07 2004 00:00:00 GMT+0100 (CET)";
                $scope.submitRange();
                expect($scope.dataForView).toEqual(expectedFilteredData)
            });
        });

    });
});
