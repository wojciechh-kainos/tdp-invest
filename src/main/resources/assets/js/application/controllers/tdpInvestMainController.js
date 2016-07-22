define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestmentService'], function(angular, tdpInvestModule) {
    var data;
    tdpInvestModule.controller("tdpInvestMainController", function($scope, NgTableParams, Upload, $timeout, $filter) {

        //***chart***
        $scope.chartConfig = chartConfig;

        //***table***
        $scope.tableConfig  = {
            params: new NgTableParams({
                count: 10
            }, {
                counts: [],
                data: data
            })
        };

        //***file upload***
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
                            //update chart
                            $scope.chartConfig.series[0].data = response.data;

                            //update table
                            data = response.data.map(function(row){ return {date: $filter('date')(row[0], "yyyy-MM-dd"), val: row[1]}; });
                            $scope.tableConfig  = {
                                params: new NgTableParams({count: 10}, { counts: [], data: data })
                            };
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data.message;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                                                 evt.loaded / evt.total));
                    });
                }
            };
        //***end of file upload***
    });
});
