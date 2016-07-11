define(['angular', 'application/tdpInvestModule', 'application/services/tdpConvertService', 'ng-table'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, Upload, $timeout, NgTableParams) {

        $scope.chartConfig = chartConfig;

        //tablea
        $scope.inputData = inputData;

        var data = inputData.map(function(row){ return {date: row[0], val: row[1]}; });

        $scope.tableConfig  = {
            params: new NgTableParams({count: 25}, { counts: [5, 10, 25], data: data })
        };

        //file upload copied from DEMO: https://github.com/danialfarid/ng-file-upload
        $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });

        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });

        $scope.log = '';

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                  var file = files[i];
                  if (!file.$error) {
                    Upload.upload({
                        url: 'http://localhost:9005/#/tdp',
                        data: {
                          file: file
                        }
                    }).then(function (resp) {
                        $timeout(function() {
                            $scope.log = 'file: ' +
                            resp.config.data.file.name +
                            ', Response: ' + JSON.stringify(resp.data) +
                            '\n' + $scope.log;
                        });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                                evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                            '% ' + evt.config.data.file.name + '\n' +
                          $scope.log;
                    });
                  }
                }
            }
        };

    });
});
