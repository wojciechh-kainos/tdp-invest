"use strict";
define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestUploadController", function($scope, $rootScope, tdpUnitService, toastr, $state) {
    $rootScope.title = "Upload";
    $scope.isAdded = false;

    $scope.fileUploaded = function() {
        toastr.success('Data uploaded!', 'Success');
    };

    $scope.clear = function() {
        tdpUnitService.clearDatabase().then(function() {
            toastr.success('Database is now gone!', 'Success');
            $state.go('tdp.home');
        }, function() {
            toastr.error('You are not allowed to do that!', 'Error');
        })

    };
  });
});