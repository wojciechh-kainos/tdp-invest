"use strict";
define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
  tdpInvestModule.controller("tdpInvestUploadController", function($rootScope, $scope, Restangular) {
    $rootScope.title = "Upload";

    $scope.submit = function(file) {
                var fd = new FormData();
                fd.append('file', file);
                Restangular.one('/unit/range').withHttpConfig({transformRequest: angular.identity})
                    .customPOST(fd, '', undefined, {'Content-Type': undefined})

    };

  });
});