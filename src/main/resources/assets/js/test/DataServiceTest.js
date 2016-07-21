define(['angular', 'angularMocks', 'application/services/tdpInvestDataService'], function(angular, $httpBackend) {

    describe('DataService', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var DataService;
        var $httpBackend;

        beforeEach(inject(function($injector, _tdpInvestDataService_) {
             $httpBackend = $injector.get('$httpBackend');
             DataService = _tdpInvestDataService_
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
                var argumentUrl = '?endDate=' + endDateAsString + "&startDate=" + startDateAsString;

                $httpBackend.expect('GET', url + argumentUrl);
                $httpBackend.when('GET', url + argumentUrl).respond(200, responseData);

                DataService.getRows(url, startDateAsString, endDateAsString).then(function(response) {
                    expect(response).toEqual(responseData);
                });
                $httpBackend.flush();
            }));

            it('returns properly when code 400', inject(function($http) {

                var url = '/api/rows/get';
                var argumentUrl = '?endDate=' + endDateAsString + "&startDate=" + startDateAsString;

                $httpBackend.expect('GET', url + argumentUrl);
                $httpBackend.when('GET', url + argumentUrl).respond(400);

                DataService.getRows(url, startDateAsString, endDateAsString).then(function(response) {
                    expect(response).toEqual("getRows request has failed. Status code: 400");
                });
                $httpBackend.flush();
            }));

            it('TESTING PROMISES SUCCESS', inject(function($http) {

                var url = '/api/rows/get';

                $httpBackend.expect('GET', url);
                $httpBackend.when('GET', url).respond(200, responseData);

                DataService.TESTINGPROMISES(url).then(function(response) {
                    expect(response).toEqual(responseData);
                }, function(failure) {
                });
                $httpBackend.flush();
            }));

            it('TESTING PROMISES FAILURE', inject(function($http) {

                var url = '/api/rows/get';

                $httpBackend.expect('GET', url);
                $httpBackend.when('GET', url).respond(400, responseData);

                var res;
                DataService.TESTINGPROMISES(url).then(function(response) {
                }, function(failure) {
                    expect(failure).toEqual("Your promise didn't get back successfully! Status code: 400");
                });
                $httpBackend.flush();
            }));
        });

    });
});

