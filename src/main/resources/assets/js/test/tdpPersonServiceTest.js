define(['angular', 'angularMocks', 'application/services/tdpPersonService'], function(angular) {

//    describe('tdpPersonService', function() {
//        beforeEach(angular.mock.module('tdpInvestModule'));
//
//        var tdpPersonService, httpBackend;
//
//        beforeEach(inject(function(_tdpPersonService_, $httpBackend){
//            tdpPersonService = _tdpPersonService_;
//            httpBackend = $httpBackend;
//        }));
//            httpBackend.whenGet("/api/person/1").respond(jsonResponse);
////        it("should return sth", function () {
//            var id = 1;
////
//            var jsonResponse = {
//                    "data":155,
//                    "status":200,
//                    "config": {
//                         "method":"GET",
//                         "transformRequest":[null],
//                         "transformResponse":[null],
//                         "url":"/api/person/1",
//                         "headers": {
//                             "Accept":"application/json, text/plain, */*"
//                         }
//                    },
//                    "statusText":"OK"
//                };
////            httpBackend.whenGet("/api/person/1").respond(jsonResponse);
////            tdpPersonService.getPerson(id).then(function($http.get("/api/person/" + personId)) {
////                expect(response).toEqual(jsonResponse);
////            })
////        }
////   ; httpBackend.flush();
//    });
describe("reddit api service", function () {
  var tdpPersonService, httpBackend;

  beforeEach(angular.mock.module('tdpInvestModule'));

  beforeEach(inject(function (_tdpPersonService_, $httpBackend) {
    tdpPersonService = _tdpPersonService_;
    httpBackend = $httpBackend;
  }));

  it("should do something", function () {
    httpBackend.whenGET("http://api.reddit.com/user/yoitsnate/submitted.json").respond({
        data: {
          children: [
            {
              data: {
                subreddit: "golang"
              }
            },
            {
              data: {
                subreddit: "javascript"
              }
            },
            {
              data: {
                subreddit: "golang"
              }
            },
            {
              data: {
                subreddit: "javascript"
              }
            }
          ]
        }
    });
    tdpPersonService.getPerson(1).then(function(subreddits) {
      expect(subreddits).toEqual(["golang", "javascript"]);
    });
    httpBackend.flush();
  });

});

});