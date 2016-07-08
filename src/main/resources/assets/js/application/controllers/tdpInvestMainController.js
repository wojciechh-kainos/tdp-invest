define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, Upload, $timeout) {

        $scope.chartConfig = chartConfig;

        {/*
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
                        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
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
*/}
    });
});
