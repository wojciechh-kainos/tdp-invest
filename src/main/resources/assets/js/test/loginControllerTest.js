define(['angular', 'angularMocks', 'application/auth/controllers/tdpInvestLoginController', 'application/auth/services/tdpInvestAuthService'], function (angular) {

    describe('tdpInvestLoginController', function () {
        beforeEach(angular.mock.module('tdpInvestAuthModule'));

        var authService;
        var deferred;
        var $window;
        var $scope;

        beforeEach(inject(function ($controller, _$rootScope_, tdpInvestAuthService, $q) {
            deferred = $q.defer();
            $scope = _$rootScope_.$new();
            authService = tdpInvestAuthService;
            $window = {location: {}};

            spyOn(authService, 'login').and.returnValue(deferred.promise);
            spyOn(authService, 'clearCredentials').and.returnValue('');
            spyOn(authService, 'setCredentials').and.returnValue('');

            $controller('tdpInvestLoginController', {$scope: $scope, tdpAuthService: authService, $window: $window});
        }));

        describe('When logging in', function () {

            it('with valid credentials should succeed', function () {
                deferred.resolve({success: true});

                $scope.login();
                $scope.$apply();

                expect($window.location.href).toBe("/");
            });

            it('with invalid credentials should fail', function () {
                deferred.resolve({success: false, message: "error"});

                $scope.login();
                $scope.$apply();

                expect($scope.error).toBe("error");
            });

        });
    });
});
