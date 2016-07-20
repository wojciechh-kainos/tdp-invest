define(['angular', 'angularMocks', 'application/services/DataService'], function(angular, $httpBackend) {

    describe('DataService', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var DataService;

        beforeEach( inject( function(_DataService_){
          DataService = _DataService_;
        }));

        var $httpBackend;

        beforeEach(inject(function($injector) {
             $httpBackend = $injector.get('$httpBackend');
           }));

        describe('Testing service', function() {
            it('returns proper value', inject(function($http) {
                var $scope = {};

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

