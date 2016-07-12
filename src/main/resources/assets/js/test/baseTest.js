define(['angular', 'angularMocks', 'application/controllers/tdpInvestPersonController'], function(angular) {

    describe('tdpInvestPersonController', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $controller;
        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));

        var id = 4;

        describe('When expecting true', function() {
            it('true should pass', function() {
                var $scope = {};
                var controller = $controller('tdpInvestPersonController', { $scope: $scope, $stateParams: {personId: id} });
                expect(true).toEqual(true);
            });
        });

    });
});


