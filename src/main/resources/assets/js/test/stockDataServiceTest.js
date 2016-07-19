define(['angular', 'angularMocks', 'application/services/tdpInvestStockDataService'], function (angular) {
    describe('tdpInvestStockDataService', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));
        
        var $httpBackend;
        var $service;
        
        beforeEach(inject(function (_stockData_, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $service = _stockData_;
        }));
        
        describe('getData', function () {
            it('should return valid data', function () {
                var data = [2, 2];
                $httpBackend.expectGET('/api/unit/select/1').respond(200, data);
                $service.promise
                    .then(function (response) {
                    expect(response).toEqual(data);
                });
                $httpBackend.flush();

            })
        })
    })
});