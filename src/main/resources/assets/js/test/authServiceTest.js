define(['angular', 'angularMocks', 'application/services/tdpAuthService'], function(angular) {

    describe('tdpInvestAuthService', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $httpBackend;
        var $service;

        beforeEach(inject(function( _tdpAuthService_, _$httpBackend_){
            $service = _tdpAuthService_;
            $httpBackend = _$httpBackend_;

        }));

        describe('When login', function() {
            it('with valid credentials should succeed', function() {

                $httpBackend.expectPOST('/api/login', undefined).respond(200, '');

                $service.Login(undefined, undefined)
                    .then( function(response){

                        expect(response.success).toEqual(true);

                    });

                $httpBackend.flush();

            });

            it('with invalid credentials should fail', function() {

                $httpBackend.expectPOST('/api/login', undefined).respond(400, '');

                $service.Login(undefined, undefined)
                    .then( function(response){
                        expect(response.success).toEqual(false);

                    });

                $httpBackend.flush();

            });
        });


        describe('When register', function() {
            it('with valid credentials should succeed', function() {

                $httpBackend.expectPOST('/api/register', undefined).respond(200, '');

                $service.Register(undefined, undefined)
                        .then( function(response){

                        expect(response.success).toEqual(true);

                        });

                $httpBackend.flush();
            });

            it('with email already in use should fail', function() {

                $httpBackend.expectPOST('/api/register', undefined).respond(409, '');

                $service.Register(undefined, undefined)
                    .then( function(response){

                        expect(response.success).toEqual(false);
                        expect(response.message).toEqual("Email address already in use.");
                    });

                $httpBackend.flush();
            });

            it('should fail when server error', function() {

                $httpBackend.expectPOST('/api/register', undefined).respond(500, '');

                $service.Register(undefined, undefined)
                    .then( function(response){

                        expect(response.success).toEqual(false);
                        expect(response.message).toEqual("Registration failed.");
                    });

                $httpBackend.flush();
            });
        });

    });
});
