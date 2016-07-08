define(['angular', 'application/tdpInvestModule', 'ng-table'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, NgTableParams) {

        $scope.chartConfig = chartConfig;
        $scope.inputData = inputData;
        
        var data = inputData.map(function(row){ return {date: row[0], val: row[1]}; });

        $scope.tableConfig  = {
            params: new NgTableParams({count: 25}, { counts: [5, 10, 25], data: data })
        };
    });
});
