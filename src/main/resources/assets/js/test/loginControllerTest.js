define(['angular', 'angularMocks', 'restangular','application/controllers/tdpInvestLoginController',
 'application/services/tdpAuthenticationService'], function (angular) {

    describe('tdpInvestLoginController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var deferred;
        var $scope;
        var $q;

        beforeEach(inject(function ($controller, _$rootScope_, _$q_, tdpAuthenticationService) {
            $q = _$q_;
            $scope = _$rootScope_.$new();
            deferred = $q.defer();
            tdpAuthService = tdpAuthenticationService;


            $controller('tdpInvestLoginController', {$scope: $scope, tdpAuthService: tdpAuthService});
        }));

        describe('When login', function () {
            spyOn(tdpAuthService, 'Login').and.returnValue(deferred.promise);
            spyOn(tdpAuthService, 'ClearCredentials').and.returnValue('');
            spyOn(tdpAuthService, 'SetCredentials').and.returnValue('');

            it('with valid credentials should succeed', inject(function () {
                deferred.resolve({success: true});

                $scope.login();
                $scope.$apply();

                expect($scope.dataLoading).toEqual(true);
            }));

            it('with invalid credentials should fail', inject(function () {
                deferred.resolve({success: false, message: "error"});

                $scope.login();
                $scope.$apply();

                expect($scope.error).toEqual("error");
            }));

        });
    });
});