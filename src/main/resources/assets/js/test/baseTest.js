define(['angular', 'angularMocks', 'application/controllers/tdpInvestPersonController'], function(angular) {

    describe('tdpInvestPersonController', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $controller, id, $scope, httpMock;
        beforeEach(inject(function(_$controller_, $httpBackend){
            $controller = _$controller_;
            httpMock = $httpBackend;
            $scope = {};
            id = '4';
        }));

        describe('$scope.message', function() {
            it('is being set to a proper value', function() {
                httpMock.expectGET("/api/person/" + id).respond(id);
                var ctrl = $controller('tdpInvestPersonController', {
                    $scope: $scope,
                    $stateParams: {personId: id}
                });
                httpMock.flush();
                expect($scope.message.data).toBe(id);
            });
        });
    });
});

