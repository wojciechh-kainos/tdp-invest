define(['angular', 'application/tdpInvestModule', 'application/services/tdpUploadService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestUploadController", function($scope, $stateParams, tdpUploadService) {

        $scope.alert = ""
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
    .directive('fileModel', ['$parse', function ($parse) {
              return {
                  restrict: 'A',
                  link: function(scope, element, attrs) {
                      var model = $parse(attrs.fileModel);
                      var modelSetter = model.assign;

                      element.bind('change', function(){
                          scope.$apply(function(){
                              modelSetter(scope, element[0].files[0]);
                          });
                      });
                  }
              };
          }]);
});
