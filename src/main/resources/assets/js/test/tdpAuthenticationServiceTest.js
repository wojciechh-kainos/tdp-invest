define(['angular', 'angularMocks', 'restangular', 'application/services/tdpBase64Service', 'application/services/tdpAuthenticationService'], function (angular) {

    describe('tdpAuthenticationService', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var deferred;
        var scope;
        var $q;
        var tdpBase64Service;
        var Restangular;
        var cookieStore;
        var tdpAuthenticationService;

        beforeEach(inject(function (_$q_, _tdpBase64Service_, _Restangular_, _$cookieStore_, _tdpAuthenticationService_) {
            $q = _$q_;
            deferred = $q.defer();
            tdpBase64Service = _tdpBase64Service_;
            Restangular = _Restangular_;
            cookieStore = _$cookieStore_;
            tdpAuthenticationService = _tdpAuthenticationService_;
        }));

        describe('When setting credentials', function () {

            it('should put globals cookie in cookieStore and set currentUser.name to "user' , inject(function () {
                spyOn(tdpBase64Service, 'encode').and.returnValue('Basic dXNlcjpwYXNz');
                spyOn(Restangular, 'setDefaultHeaders').and.callThrough();
                spyOn(tdpAuthenticationService, 'getCurrentUser').and.callThrough();
                spyOn(cookieStore, 'put').and.callThrough();

                tdpAuthenticationService.setCredentials('user', 'pass');

                expect(cookieStore.put).toHaveBeenCalled();
                expect(tdpAuthenticationService.getCurrentUser().name).toEqual('user');
            }));

        });

        describe('When clearing credentials', function () {

            it('should remove globals cookie from cookieStore', inject(function () {
                spyOn(Restangular, 'setDefaultHeaders').and.callThrough();
                spyOn(cookieStore, 'remove').and.callThrough();

                tdpAuthenticationService.clearCredentials();

                expect(cookieStore.remove).toHaveBeenCalled();
            }));

        });
    });
});