define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpUploadService", [ "$http", function($http) {

        this.uploadFile = function(file){
            var fd = new FormData();
            fd.append('file', file);
            return $http.post("/api/files/upload", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (res) {
                  return {success: true, message: "Upload succeed"};
              }, function () {
                  return {success: false, message: "Upload failed"};
              });
    }
    }])
});