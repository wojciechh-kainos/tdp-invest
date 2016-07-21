define(['angular', 'angularMocks', 'application/services/tdpInvestStockDataService'], function (angular) {
    describe('tdpInvestStockDataService', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $httpBackend;
        var service;
        var dataFund = [2, 2];
        var dataUnit = [2, 2];

        beforeEach(inject(function (_stockData_, _$httpBackend_, _$q_) {
            $httpBackend = _$httpBackend_;
            service = _stockData_;
        }));

        describe('getData', function () {
            it('should return valid data', function () {
                $httpBackend.expectGET('/api/unit/select/1').respond(200, dataUnit);
                $httpBackend.expectGET('/api/fund').respond(200, dataFund);

                service.promise
                    .then(function (response) {
                        expect(response).toEqual(dataUnit);
                    });
                $httpBackend.flush();
            });


            it('should return fund list', function () {
                $httpBackend.expectGET('/api/unit/select/1').respond(200, dataUnit);
                $httpBackend.expectGET('/api/fund').respond(200, dataFund);

                service.loadFundList
                    .then(function (response) {
                        expect(response).toEqual(dataFund);
                    });

                $httpBackend.flush();
            });

        })
    })
});
