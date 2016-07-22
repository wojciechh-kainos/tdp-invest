define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpInvestUploadService", function($http) {
        this.uploadFile = function(file) {
            var f = new FormData();
            f.append('file', file);

            console.dir(f);

            var req = {
             method: 'POST',
             url: '/api/unit/upload',
             headers: {
               'Content-Type': 'multipart/form-data',

             },
             data: { file: f }
            }

            return $http(req);
        };
    })
});
