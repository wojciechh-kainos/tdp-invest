define(['angular', 'application/tdpInvestModule', 'application/services/tdpUserService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestRegisterController", function($location, $scope, tdpUserService) {



        $scope.register = function() {


                $scope.dataLoading = true;
                tdpUserService.Create($scope.user)
                    .then(function (response) {
                        if (response.success) {
                             // FlashService.Success('Registration successful', true);

                            $location.path('/login');
                        } else {
                            // tdpFlashMessageService.Error(response.message);
                            $scope.dataLoading = false;
                            $scope.error = "Registration failed.";
                        }
                    });
            }

        
    });
});
