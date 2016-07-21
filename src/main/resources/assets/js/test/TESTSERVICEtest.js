define(['angular', 'angularMocks', 'application/services/TESTSERVICE'], function(angular, $httpBackend) {

    describe('TESTSERVICE', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var DataService;
        var $httpBackend;

        beforeEach(inject(function($injector, _TESTSERVICE_) {
             $httpBackend = $injector.get('$httpBackend');
             DataService = _TESTSERVICE_;
           }));

        var startDateAsString = "2011-11-11";
        var endDateAsString = "2004-04-04";

        var firstDate = new Date(startDateAsString);
        var secondDate = new Date("2002-02-02");
        var thirdDate = new Date(endDateAsString);

        var firstVal = 100;
        var secondVal = 200;
        var thirdVal = 300;

        var responseData = [{"date" : firstDate, "value" : firstVal}, {"date" : secondDate, "value" : secondVal}, {"date": thirdDate, "value" : thirdVal}];

        describe('Testing service', function() {
            it('returns properly when code 200', inject(function($http) {
                var url = '/api/rows/get';

                $httpBackend.expect('GET', url);
                $httpBackend.when('GET', url).respond(200, responseData);

                DataService.getRows(url).then(function(response) {
                    expect(response).toEqual(responseData);
                });
                $httpBackend.flush();
            }));

            it('returns properly when code 400', inject(function($http) {
                var url = '/api/rows/get';

                $httpBackend.expect('GET', url);
                $httpBackend.when('GET', url).respond(400);

                DataService.getRows(url, startDateAsString, endDateAsString).then(function(response) {
                    expect(response).toEqual("No records available for these params!");
                });
                $httpBackend.flush();
            }));

            it('returns properly when code 500', inject(function($http) {
                var url = '/api/rows/get';

                $httpBackend.expect('GET', url);
                $httpBackend.when('GET', url).respond(500);

                DataService.getRows(url, startDateAsString, endDateAsString).then(function(response) {
                    expect(response).toEqual("Some serious server error!");
                });
                $httpBackend.flush();
            }));

        });

    });
});

