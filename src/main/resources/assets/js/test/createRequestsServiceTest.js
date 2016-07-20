define(['angular', 'angularMocks', 'application/services/tdpInvestCreateRequestsService'], function (angular) {

    describe('tdpInvestCreateRequestsService', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $httpBackend;
        var $service;

        beforeEach(inject(function (_tdpInvestCreateRequestsService_, _$httpBackend_) {
            $service = _tdpInvestAuthService_;
            $httpBackend = _$httpBackend_;
        }));

        describe('', function () {

        });
    });
});
