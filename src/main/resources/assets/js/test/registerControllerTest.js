define(['angular', 'restangular', 'angularMocks', 'application/controllers/tdpInvestRegisterController', 'application/services/tdpAuthenticationService'], function (angular, _) {

    describe('tdpInvestRegisterController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var authService;
        var deferred;
        var $state;
        var $scope;
        var $q;

        beforeEach(inject(function ($controller, _$rootScope_, tdpAuthenticationService, _$q_, _$state_) {
            $q = _$q_;
            deferred = $q.defer();
            $scope = _$rootScope_.$new();
            authService = tdpAuthenticationService;
            $state = _$state_;

            spyOn($state, 'go');
            spyOn(authService, 'register').and.returnValue('');

            $controller('tdpInvestRegisterController', {$scope: $scope, authService: authService});
        }));

        describe('When registering with valid credentials', function () {
            it('should redirect to login page', function () {
                deferred.resolve({});

                $scope.register();
                $scope.$apply();

                expect($state.go).toHaveBeenCalledWith('login');
            });
        });

        describe('When registering when email already taken', function () {
            it('should display error message', function () {
                deferred.reject({message: "error"});

                $scope.register();
                $scope.$apply();

                expect($scope.error).toEqual(true);
            });
        });
    });
});