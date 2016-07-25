define(['angular', 'application/tdpInvestModule', 'angular-file-upload', 'ngCookies', ], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestUploadController", function ($scope, $state, FileUploader, $http, $cookieStore) {
        $scope.showGif = false;
        $scope.error = false;
        $scope.uploader = new FileUploader();
        $scope.uploader.url="/api/unit/upload";
        $scope.uploader.headers = {'Authorization' : 'Basic ' + $cookieStore.get("currentUser").authdata};

        $scope.uploader.onProgressAll = function(){
            $scope.showGif = true;
        }

        $scope.uploader.onCompleteAll = function(){
            $state.go('main');
            $scope.error = false;
        }

        $scope.uploader.onErrorItem = function(){
            $scope.error = true;
            $scope.gif = false;
        }

    });
});