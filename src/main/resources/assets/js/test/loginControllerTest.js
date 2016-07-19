define(['angular', 'angularMocks', 'application/controllers/tdpInvestLoginController', 'application/services/tdpInvestAuthService'], function (angular) {

    describe('tdpInvestLoginController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

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
            spyOn(authService, 'login').and.returnValue(deferred.promise);
            spyOn(authService, 'clearCredentials').and.returnValue('');
            spyOn(authService, 'setCredentials').and.returnValue('');

            $controller('tdpInvestLoginController', {$scope: $scope, tdpAuthService: authService});
        }));

        describe('When logging in', function () {

            it('with valid credentials should succeed', function () {
                deferred.resolve({success: true});

                $scope.login();
                $scope.$apply();

                expect($state.go).toHaveBeenCalledWith('tdp.dashboard');
            });

            it('with invalid credentials should fail', function () {
                deferred.resolve({success: false, message: "error"});

                $scope.login();
                $scope.$apply();

                expect($state.go).not.toHaveBeenCalled();
            });

        });
    });
});
