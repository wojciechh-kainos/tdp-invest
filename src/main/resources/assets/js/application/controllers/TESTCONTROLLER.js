define(['angular', 'application/tdpInvestModule', 'application/services/TESTSERVICE'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("TESTCONTROLLER", function($scope, TESTSERVICE) {

        function handleSuccess(data) {
            $scope.chart = data;
            $scope.messageForUser = "success";
        }

        function handleFailure(message) {
            $scope.chart = [];
            $scope.messageForUser = message;
        }

        $scope.getRecords = function(url, startDate, endDate) {
            TESTSERVICE.getRows(url, startDate, endDate).then(handleSuccess, handleFailure);
        }
    });
});
