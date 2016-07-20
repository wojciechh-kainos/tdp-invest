"use strict";
define(['angular', 'application/tdpInvestModule', 'application/services/tdpUnitService'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestUploadController", function($scope, $rootScope) {
    $rootScope.title = "Upload";
        $scope.isAdded = false;

        $scope.fileUploaded = function() {
          $scope.isAdded = true;
          console.log($scope.isAdded);
        };
  });
});