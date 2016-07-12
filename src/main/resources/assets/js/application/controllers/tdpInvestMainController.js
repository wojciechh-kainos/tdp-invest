define(['angular', 'application/tdpInvestModule', 'application/services/tdpConvertService', 'ng-table'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, Upload, $timeout, NgTableParams) {

        $scope.chartConfig = chartConfig;
        $scope.inputData = inputData;
        //
        var data = inputData.map(function(row){ return {date: row[0], val: row[1]}; });

        $scope.tableConfig  = {
            params: new NgTableParams({count: 50}, { counts: [25, 50, 100], data: data })
        };

        //file upload copied from DEMO: https://github.com/danialfarid/ng-file-upload
        $scope.uploadFiles = function(file, errFiles) {
                $scope.f = file;
                $scope.errFile = errFiles && errFiles[0];
                if (file) {
                    file.upload = Upload.upload({
                        url: 'http://localhost:9005/api/convert',
                        data: {file: file}
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                            $scope.result = response.data;
                            $scope.chartConfig.series.push({
                                    data: response.data});
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                                                 evt.loaded / evt.total));
                    });
                }
            }

    });
});
