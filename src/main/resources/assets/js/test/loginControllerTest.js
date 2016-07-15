define(['angular', 'angularMocks', 'application/controllers/tdpInvestLoginController', 'application/services/tdpAuthService'], function (angular) {

    describe('tdpInvestLoginController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var authService;
        var deferred;
        var location;
        var $scope;
        var $q;

        beforeEach(inject(function ($controller, _$rootScope_, $location, tdpAuthService, _$q_) {
            $q = _$q_;
            deferred = $q.defer();
            $scope = _$rootScope_.$new();
            authService = tdpAuthService;
            location = $location;

            spyOn(location, 'path');
            spyOn(authService, 'Login').and.returnValue(deferred.promise);
            spyOn(authService, 'ClearCredentials').and.returnValue('');
            spyOn(authService, 'SetCredentials').and.returnValue('');

            $controller('tdpInvestLoginController', {$scope: $scope, $location: location, tdpAuthService: authService});
        }));

        describe('When logging in', function () {

            it('with valid credentials should succeed', inject(function () {
                deferred.resolve({success: true});

                $scope.login();
                $scope.$apply();

                expect(location.path).toHaveBeenCalledWith('/tdp');
                expect(authService.SetCredentials).toHaveBeenCalled();
            }));

            it('with invalid credentials should fail', inject(function () {
                deferred.resolve({success: false, message: "error"});

                $scope.login();
                $scope.$apply();

                expect($scope.error).toEqual("error");
                expect(authService.SetCredentials).not.toHaveBeenCalled();
            }));

        });
    });
});
