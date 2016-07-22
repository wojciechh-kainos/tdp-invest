define(['angular', 'application/tdpInvestModule', 'angular-file-upload'], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestUploadController", function ($scope, $state, FileUploader, $http) {
        $scope.showGif = false;
        $scope.uploader = new FileUploader();
        $scope.uploader.url="/api/unit/upload";

        $scope.uploadFile = function(item){
            console.dir(item.file);
            var file = new FormData();
            file.append('file', item.file)
            $http.post("api/unit/upload", file, {'Content-type' : 'multipart/form-data'});
        }



    });
});
