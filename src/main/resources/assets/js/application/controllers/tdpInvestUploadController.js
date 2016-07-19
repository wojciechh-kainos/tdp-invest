"use strict";
define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestUploadController", function($rootScope, $scope, Restangular) {
    $rootScope.title = "Upload";
    $scope.isAdded = false;

    $scope.fileUploaded = function() {
      $scope.isAdded = true;
      console.log($scope.isAdded);
    };

  });
});