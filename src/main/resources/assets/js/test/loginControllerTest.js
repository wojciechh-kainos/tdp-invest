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

            $controller('tdpInvestLoginController', {$scope: $scope, tdpAuthService: authService, $window: $window});
        }));

        describe('When logging in with valid credentials', function () {
            it('should redirect to root directory', function () {
                deferred.resolve({});

                $scope.login();
                $scope.$apply();

                expect($window.location.href).toBe("/");
            });
        });

        describe('When logging in with invalid credentials', function () {
            it('should display error message', function () {
                deferred.reject({message: "error"});

                $scope.login();
                $scope.$apply();

                expect($scope.error).toBe("error");
            });
        });
    });
});
