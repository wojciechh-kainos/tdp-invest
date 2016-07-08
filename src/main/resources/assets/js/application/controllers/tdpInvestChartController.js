define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestChartController", function($scope, $stateParams) {

    $scope.investmentValue = 5000;
    $scope.investmentPercent = 3;
    var data = [];

    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    $scope.makeData = function() {
        data = [];
        var percentPerMonth = parseInt($scope.investmentPercent) / 12;
        var value = parseInt($scope.investmentValue);
        for(i = 1; i < 13; i++) {
            data.push(value);
            value += value * percentPerMonth/100;
            console.log(value);
        }
        console.log("halo");
    };


    $scope.updateChart = function() {
        $scope.makeData();
        $scope.chartConfig.series[0].data = data;
    };


    });
});
