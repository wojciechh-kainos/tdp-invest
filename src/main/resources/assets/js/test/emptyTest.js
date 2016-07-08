define(['angular', 'angularMocks', 'application/controllers/emptyController'], function(angular) {

    describe('emptyController', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $controller;
        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));

        var value = "tekst";

        describe('$scope.text', function() {
            it('value is correct', function() {
                var $scope = {};
                var controller = $controller('emptyController', { $scope: $scope });
                expect($scope.text).toEqual(value);
            });
        });

    });
});
