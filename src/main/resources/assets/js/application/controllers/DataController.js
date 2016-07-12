define(['angular', 'application/tdpInvestModule', 'application/services/DataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("DataController", function($scope, $state, DataService, dataUrl) {
        $scope.myVal = $state.current.data.receivedData;
    })
});
