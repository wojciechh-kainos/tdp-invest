define(['angular', 'angularMocks', 'application/auth/services/tdpInvestAuthService'], function (angular) {

    describe('tdpInvestAuthService', function () {
        beforeEach(angular.mock.module('tdpInvestAuthModule'));

        var $httpBackend;
        var service;

        beforeEach(inject(function (_tdpInvestAuthService_, _$httpBackend_) {
            service = _tdpInvestAuthService_;
            $httpBackend = _$httpBackend_;

            spyOn(service, 'setCredentials');
            spyOn(service, 'clearCredentials');
        }));

        describe('When logging in', function () {
            it('with valid credentials should succeed', function () {
                $httpBackend.expectGET('/api/login', undefined).respond(200, 'token');

                service.login('username', 'password');
                $httpBackend.flush();

                expect(service.setCredentials).toHaveBeenCalledWith('username', 'token');
            });

            it('with invalid credentials should fail', function () {
                $httpBackend.expectGET('/api/login', undefined).respond(400, '');

                var promise = service.login('username', 'password');
                $httpBackend.flush();

                expect(service.clearCredentials).toHaveBeenCalled();
                expect(promise.$$state.value.message).toEqual('Wrong email or password.');
            });
        });

        describe('When registering', function () {
            it('with valid credentials should succeed', function () {
                $httpBackend.expectPOST('/api/register', undefined).respond(200, '');

                var promise = service.register(undefined, undefined);
                $httpBackend.flush();

                expect(promise.$$state.status).toEqual(1); // resolved

            });

            it('with email already in use should fail', function () {
                $httpBackend.expectPOST('/api/register', undefined).respond(409, '');

                var promise = service.register(undefined, undefined);
                $httpBackend.flush();

                expect(promise.$$state.status).toEqual(2); // rejected
                expect(promise.$$state.value.message).toEqual('Email address already in use.');
            });

            it('should fail when server returns error', function () {
                $httpBackend.expectPOST('/api/register', undefined).respond(500, '');

                var promise = service.register(undefined, undefined);
                $httpBackend.flush();


                expect(promise.$$state.status).toEqual(2); // rejected
                expect(promise.$$state.value.message).toEqual('Registration failed.');
            });
        });
    });
});
