define(['angular', 'application/tdpInvestModule', 'application/services/tdpLoginService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestNavbarController", function($scope, $rootScope, tdpLoginService) {


        console.log($rootScope.globals);


        // $scope.$watch('$rootScope.globals.currentUser', function(newValue, oldValue, $scope) {
        //     if(newValue!==oldValue) {

                if ($rootScope.globals.currentUser) {
                    $scope.isUserLoggedIn = true;
                }
        //     }
        // });




    });
});