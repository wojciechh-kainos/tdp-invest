define(['angular', 'application/tdpInvestModule', 'application/services/tdpUploadService', 'application/directives/tdpInvestFileModelDirective'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestUploadController", function($scope, $stateParams, tdpUploadService) {

        $scope.alert = "";
        $scope.fileName = "";
        $scope.uploadFile = function(){
        var file = $scope.fileToUpload;
        $scope.uploadPromise = tdpUploadService.uploadFile(file)
            .then(function (response) {
                 if (response.success) {
                     $scope.alert = response.message
                 } else {
                     $scope.alert = response.message;
                 }
             });
        };
    })
});
