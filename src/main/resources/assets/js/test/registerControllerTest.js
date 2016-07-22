//define(['angular', 'restangular', 'angularMocks', 'application/controllers/tdpInvestRegisterController', 'application/services/tdpInvestAuthenticationService'], function (angular, _) {
//
//    describe('tdpInvestRegisterController', function () {
//        beforeEach(angular.mock.module('tdpInvestModule'));
//
//        var authService;
//        var deferred;
//        var $state;
//        var $scope;
//        var $q;
//
//        beforeEach(inject(function ($controller, _$rootScope_, tdpInvestAuthenticationService, _$q_, _$state_) {
//            $q = _$q_;
//            deferred = $q.defer();
//            $scope = _$rootScope_.$new();
//            authService = tdpInvestAuthenticationService;
//            $state = _$state_;
//
//            spyOn($state, 'go');
//            spyOn(authService, 'register').and.returnValue(deferred.promise);
//
//            $controller('tdpInvestRegisterController', {$scope: $scope, tdpAuthService: authService});
//        }));
//
//        describe('When registering with valid credentials', function () {
//            it('should redirect to login page', function () {
//                deferred.resolve({});
//                console.log("ddddd");
//                $scope.register();
//                $scope.$apply();
//
//                expect($state.go).toHaveBeenCalledWith('login2');
//            });
//        });
//
//        describe('When registering when email already taken', function () {
//            it('should display error message', function () {
//                deferred.reject({message: "error"});
//
//                $scope.register();
//                $scope.$apply();
//
//                expect($scope.error).toEqual("error2");
//            });
//        });
//    });
//});