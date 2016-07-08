define(['angular','application/tdpInvestModule'], function(angular, tdpInvestModule){
    tdpInvestModule.controller("emptyController", function($scope , $stateParams){
    $scope.text = "tekst";
    $scope.i =0;
    $scope.changeText = function(){
      //  if ($scope.i%2==0) $scope.text = "changedText";
     //   if ($scope.i%2==1) $scope.text = "text";
        $scope.i++;
        }
    })
})