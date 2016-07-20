define(['angular', 'angularMocks', 'application/auth/controllers/tdpInvestRegisterController', 'application/auth/services/tdpInvestAuthService'], function (angular) {

    describe('tdpInvestRegisterController', function () {
        beforeEach(angular.mock.module('tdpInvestAuthModule'));

        var authService;
        var deferred;
        var $state;
        var $scope;
        var $q;

        beforeEach(inject(function ($controller, _$rootScope_, tdpInvestAuthService, _$q_, _$state_) {
            $q = _$q_;
            deferred = $q.defer();
            $scope = _$rootScope_.$new();
            authService = tdpInvestAuthService;
            $state = _$state_;

            spyOn($state, 'go');
            spyOn(authService, 'register').and.returnValue(deferred.promise);

            $controller('tdpInvestRegisterController', {$scope: $scope, tdpAuthService: authService});
        }));

        describe('When registering', function () {

            it('with valid credentials should succeed', function () {
                deferred.resolve({success: true});

                $scope.register();
                $scope.$apply();

                expect($state.go).toHaveBeenCalledWith('login');
            });

            it('when user already exists should fail', function () {
                deferred.resolve({success: false, message: "error"});

                $scope.register();
                $scope.$apply();

                expect($scope.error).toEqual("error");
            });

        });
    });
});
