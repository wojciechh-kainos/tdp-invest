define(['angular', 'application/tdpInvestModule', 'ng-table', 'application/services/tdpTableService'], function(angular, tdpInvestModule) {
    var chartData = []

    tdpInvestModule.controller("tdpInvestMainController", function($scope, NgTableParams, Upload, $timeout, tdpTableService) {
git 
        //***chart***
        $scope.chartConfig = chartConfig;

        //***table***
        var data = chartData.map(function(row){ return {date: row[0], val: row[1]}; });
        $scope.tableConfig  = {
            params: new NgTableParams({count: 10}, { counts: [], data: data })
        };

        //$scope.timeseries = tdpTableService.getInvestmentTimeSeries("2016-01-01", "2016-06-01", 1000.0, 0.04);

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
                            $scope.chartConfig.series.push({
                                                               name: "Fund",
                                                               data: response.data,
                                                               tooltip: {
                                                                   valueDecimals: 2,
                                                                   valuePrefix: "$",
                                                                   xDateFormat: '%y-%m-%d'
                                                               }
                                                           });
                            chartData = response.data;
                            data = response.data.map(function(row){ return {date: row[0], val: row[1]}; });
                            $scope.tableConfig  = {
                                params: new NgTableParams({count: 10}, { counts: [], data: data })
                            };
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
        //***end of file upload***
    });
});
