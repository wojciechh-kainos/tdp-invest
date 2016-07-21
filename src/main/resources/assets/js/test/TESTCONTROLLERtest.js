define( ['angular' , 'angularMocks' , 'application/controllers/TESTCONTROLLER', 'application/services/TESTSERVICE'], function(angular){

    describe('TESTCONTROLLER', function() {

        beforeEach (angular.mock.module('tdpInvestModule'));

        var TESTSERVICE;
        var $controller;
        var $scope;
        var $q;
        var deferred;

        beforeEach (inject (function (_$controller_, _$rootScope_, _$q_, _TESTSERVICE_) {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
            $q = _$q_;
            deferred = $q.defer();

            TESTSERVICE = _TESTSERVICE_;

            spyOn(TESTSERVICE, 'getRows').and.returnValue(deferred.promise);
        }));

        describe('Check if controller', function(){
            beforeEach(function() {
                $controller('TESTCONTROLLER', { $scope: $scope, TESTSERVICE: TESTSERVICE });
            });
            var startDateAsString = "2011-11-11";
            var endDateAsString = "2004-04-04";

            var firstDate = new Date(startDateAsString);
            var secondDate = new Date("2002-02-02");
            var thirdDate = new Date(endDateAsString);

            var firstVal = 100;
            var secondVal = 200;
            var thirdVal = 300;
            var data = [{"date" : firstDate, "value" : firstVal}, {"date" : secondDate, "value" : secondVal}, {"date": thirdDate, "value" : thirdVal}];


            it('sets variables properly when promise resolved', function() {
                deferred.resolve(data)

                $scope.getRecords("", startDateAsString, endDateAsString);
                $scope.$digest();

                expect($scope.chart).toEqual(data);
                expect($scope.messageForUser).toEqual('success');
            });

            it('sets variables properly when promise rejected and status code = 400', function() {
                deferred.reject("No records available for these params!");

                $scope.getRecords("", startDateAsString, endDateAsString);
                $scope.$digest();

                expect($scope.chart).toEqual([]);
                expect($scope.messageForUser).toEqual("No records available for these params!");
            });

            it('sets variables properly when promise rejected and status code = 500', function() {
                deferred.reject("Some serious server error!");

                $scope.getRecords("", startDateAsString, endDateAsString);
                $scope.$digest();

                expect($scope.chart).toEqual([]);
                expect($scope.messageForUser).toEqual("Some serious server error!");
            });

        });
    });
});