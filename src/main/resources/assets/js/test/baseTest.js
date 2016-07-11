//define(['angular', 'angularMocks', 'application/controllers/tdpInvestPersonController'], function(angular) {
//
//    describe('tdpInvestPersonController', function() {
//        beforeEach(angular.mock.module('tdpInvestModule'));
//
//        var $controller;
//        beforeEach(inject(function(_$controller_){
//            $controller = _$controller_;
//        }));
//
//        var id = 4;

//        describe('$scope.parentId', function() {
//            it('is being set to a proper value', function() {
//                var $scope = {};
//                var controller = $controller('tdpInvestPersonController', { $scope: $scope, $stateParams: {personId: id} });
//                expect($scope.personId).toEqual(id);
//            });
//        });
//

//        describe('$scope.personId', function() {
//            it('is being set to a proper value', function() {
//                var $scope = {};
//                $scope.personId = 0;
//                var controller = $controller('tdpInvestPersonController', { $scope: $scope, $stateParams: {personId: id} });
//
//
//                expect($scope.personId).toEqual(id + '55');
//            });
//        });

//        describe('$scope.getMsg', function() {
//            it('returns a proper value', function() {
//                var $scope = {};
//                var controller = $controller('tdpInvestPersonController', { $scope: $scope, $stateParams: {personId: id} });
//                expect($scope.getPersonId()).toEqual(id);
//            });
//        });
//    });
//});

//define(['angular', 'angularMocks', 'application/controllers/tdpInvestMainController'], function(angular) {
//
//    describe('tdpInvestMainController', function(){
//
//     beforeEach(angular.mock.module('tdpInvestModule'));
//
//     var $controller;
//
//     beforeEach(inject(function(_$controller_){
//        $controller = _$controller_;
//     }));
//
//     it('should create a invest scores list with 2 scores', function() {
//           var $scope = {};
//           var controller = $controller('tdpInvestMainController', { $scope: $scope});
//           expect($controller.investData.length).toBe(5);
//         });
//
//    });
//
//});