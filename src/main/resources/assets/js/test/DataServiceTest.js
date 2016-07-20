define(['angular', 'angularMocks', 'application/services/tdpInvestDataService'], function(angular, $httpBackend) {

    describe('DataService', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var DataService;
        var $httpBackend;

        beforeEach(inject(function($injector, _tdpInvestDataService_) {
             $httpBackend = $injector.get('$httpBackend');
             DataService = _tdpInvestDataService_;
           }));

        describe('Testing service', function() {
            it('returns proper value', inject(function($http) {

                var url = '/api/rows/get/data';
                $httpBackend.when('GET', url).respond(200, {date:1468229562169, fundVal:377, depositVal:123});

                var res;
                DataService.getRows(url).then(function(response) {
                    res = response.data;
                });
                $httpBackend.flush();
                expect(res).toEqual({date:1468229562169, fundVal:377, depositVal:123});

            }));
        });

    });
});

