define(['angular', 'application/tdpInvestModule', 'application/services/tdpLoginService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestLoginController", function($scope, $rootScope, $location, $stateParams, tdpLoginService) {


                    tdpLoginService.ClearCredentials();

                    $scope.login = function () {
                        $scope.dataLoading = true;
                        tdpLoginService.Login($scope.username, $scope.password, function(response) {
                            if(response.success) {
                                tdpLoginService.SetCredentials($scope.username, $scope.password);
                                $location.path('/tdp');
                            } else {
                                $location.path('/bla');
                                $scope.error = response.message;
                                $scope.dataLoading = false;
                            }
                        });
                    };


    });
});