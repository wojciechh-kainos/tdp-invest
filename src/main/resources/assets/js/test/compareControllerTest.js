define(['angular', 'angularMocks', 'application/controllers/tdpInvestCompareController', 'application/services/tdpDataService'], function (angular) {

    describe('tdpInvestFrontController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var dataService;
        var deferred;
        var $scope;

        var exampleData = {
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
                    }
                   ]
            };

        beforeEach(inject(function ($controller, _$rootScope_, tdpDataService, tdpChartService, $q) {
            deferred = $q.defer();
            $scope = _$rootScope_.$new();
            dataService = tdpDataService;

            spyOn(dataService, 'getInvestData').and.returnValue(deferred.promise);
            var controller = $controller('tdpInvestCompareController', {$scope: $scope, tdpDataService: dataService});

        }));


        describe('When validating form ', function () {

            beforeEach(function() {
                  $scope.startDate = "Thu Nov 04 2004 00:00:00 GMT+0100 (CET)";
                  $scope.endDate ="Sun Nov 07 2004 00:00:00 GMT+0100 (CET)";
                  $scope.annualInterest = 30;
                  $scope.amount = 400;
                  $scope.investOption = 'year';
                  $scope.$apply();
            });

            it('should not accept all empty fields', function () {
                deferred.resolve({});

                $scope.annualInterest = undefined;
                $scope.amount = undefined;
                $scope.investOption = undefined;
                $scope.$apply();

                expect($scope.formValidation()).toEqual(false);
            });


            it('should accept all correctly filled fields', function () {
                deferred.resolve({});
                $scope.$apply();

                expect($scope.formValidation()).toEqual(true);
            });


            it('should not accept amount empty field', function () {
                deferred.resolve({});

                $scope.amount = undefined;
                $scope.$apply();

                expect($scope.formValidation()).toEqual(false);
            });

            it('should not accept amount less then 0', function () {
                deferred.resolve({});

                $scope.amount = -2;
                $scope.$apply();

                expect($scope.formValidation()).toEqual(false);
            });


            it('should not accept annualInterest empty field', function () {
                deferred.resolve({});

                $scope.annualInterest = undefined;
                $scope.$apply();

                expect($scope.formValidation()).toEqual(false);
            });

            it('should not accept annualInterest less then 0', function () {
                deferred.resolve({});

                $scope.annualInterest = -20;
                $scope.$apply();

                expect($scope.formValidation()).toEqual(false);
            });


            it('should not accept investOption empty field', function () {
                deferred.resolve({});

                $scope.investOption = undefined;
                $scope.$apply();

                expect($scope.formValidation()).toEqual(false);
            });
        });

    });
});
