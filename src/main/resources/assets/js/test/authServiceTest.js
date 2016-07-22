define(['angular', 'angularMocks', 'application/services/tdpInvestAuthService'], function (angular) {

    describe('tdpInvestAuthService', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $httpBackend;
        var service;

        beforeEach(inject(function (_tdpInvestAuthService_, _$httpBackend_) {
            service = _tdpInvestAuthService_;
            $httpBackend = _$httpBackend_;

            spyOn(service, 'setCredentials');
            spyOn(service, 'clearCredentials');
        }));

        describe('When logging in with valid credentials', function () {
            it('should set cookie with username and token', function () {
                var testLogin = function(result) {
                    expect(result).toEqual('token');
                    expect(service.setCredentials).toHaveBeenCalledWith('username', 'token');
                };

                $httpBackend.expectGET('/api/login', undefined).respond(200, 'token');

                service.login('username', 'password').then(testLogin);

                $httpBackend.flush();
            });
        });

        describe('When logging in with invalid credentials', function () {
            it('should return error message', function () {
                var testLogin = function(result) {
                    expect(result).not.toBeNull();
                    expect(result.error).toEqual('Wrong email or password.');
                };

                $httpBackend.expectGET('/api/login', undefined).respond(400, '');

                service.login('username', 'password').then(testLogin);

                $httpBackend.flush();
            });
        });

        describe('When registering with valid credentials', function () {
            it('should return success response code', function () {
                var testRegister = function(result) {
                    expect(result).not.toBeNull();
                    expect(result.status).toEqual(200);
                };

                $httpBackend.expectPOST('/api/register', undefined).respond(200, '');

                service.register(undefined, undefined).then(testRegister);

                $httpBackend.flush();
            });
        });

        describe('When registering with email already in use', function () {
            it('should return error message', function () {
                var testRegister = function(result) {
                    expect(result).not.toBeNull();
                    expect(result.error).toEqual('Email address already in use.');
                };

                $httpBackend.expectPOST('/api/register', undefined).respond(409, '');

                service.register(undefined, undefined).then(testRegister);

                $httpBackend.flush();
            });
        });

        describe('When registering and server returns error', function () {
            it('should return error message', function () {
                var testRegister = function(result) {
                    expect(result).not.toBeNull();
                    expect(result.error).toEqual('Registration failed.');
                };

                $httpBackend.expectPOST('/api/register', undefined).respond(500, '');

                service.register(undefined, undefined).then(testRegister);

                $httpBackend.flush();
            });
        });
    });
});
