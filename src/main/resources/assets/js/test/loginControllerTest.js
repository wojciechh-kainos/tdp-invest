define(['angular', 'angularMocks', 'application/controllers/tdpInvestLoginController', 'application/services/tdpAuthService'], function (angular) {

    describe('tdpInvestLoginController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var deferred;
        var $scope;
        var $q;

        beforeEach(inject(function ($controller, _$rootScope_, tdpAuthService, _$q_) {
            $q = _$q_;
            $scope = _$rootScope_.$new();
            deferred = $q.defer();

            spyOn(tdpAuthService, 'Login').and.returnValue(deferred.promise);
            spyOn(tdpAuthService, 'ClearCredentials').and.returnValue('');
            spyOn(tdpAuthService, 'SetCredentials').and.returnValue('');

            $controller('tdpInvestLoginController', {$scope: $scope, tdpAuthService: tdpAuthService});
        }));

        describe('When login', function () {

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
