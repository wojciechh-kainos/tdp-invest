define(['angular', 'angularMocks', 'application/controllers/tdpInvestUploadController', 'application/services/tdpUploadService'], function (angular) {

    describe('tdpInvestFrontController', function () {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var uploadService;
        var deferred;
        var $scope;

        var succeedAnswer = {success: true, message: "Upload succeed"};
        var failAnswer = {success: false, message: "Upload failed"};

        beforeEach(inject(function ($controller, _$rootScope_, tdpUploadService, tdpChartService, $q) {
            deferred = $q.defer();
            $scope = _$rootScope_.$new();
            uploadService = tdpUploadService;

            spyOn(uploadService, 'uploadFile').and.returnValue(deferred.promise);
            var controller = $controller('tdpInvestUploadController', {$scope: $scope, tdpUploadService: uploadService});
        }));

        describe('When uploading file with succeed', function () {
            it('should show success information', function () {
                deferred.resolve(succeedAnswer);
                $scope.fileToUpload = {};
                $scope.uploadFile();
                $scope.$apply();
                expect($scope.alert).toEqual(succeedAnswer.message);
            });
        });

        describe('When uploading file with fail', function () {
            it('should show fail information', function () {
                deferred.resolve(failAnswer);
                $scope.fileToUpload = {};
                $scope.uploadFile();
                $scope.$apply();
                expect($scope.alert).toEqual(failAnswer.message);
            });
        });

    });
});
