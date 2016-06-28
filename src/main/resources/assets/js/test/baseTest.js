define(['application/controllers/tdpInvestPersonController'], function(module, controller) {

    describe('tdpInvestPersonController', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $controller;
        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));

        var id = 4;

        describe('$scope.parentId', function() {
            it('is being set to a proper value', function() {
                var $scope = {};
                var controller = $controller('tdpInvestPersonController', { $scope: $scope, $stateParams: {personId: id} });
                expect($scope.personId).toEqual(id);
            });
        });

        describe('$scope.getMsg', function() {
            it('returns a proper value', function() {
                var $scope = {};
                var controller = $controller('tdpInvestPersonController', { $scope: $scope, $stateParams: {personId: id} });
                expect($scope.getPersonId()).toEqual(id);
            });
        });
    });
});

