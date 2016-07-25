define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestChartController", function($scope, $state) {

     $scope.$watch('receivedData', function() {
           var dataForChart = $scope.$parent.receivedData;;
           var dataForCompare = $scope.$parent.dataFund;;
           var keys = [];
           if (dataForChart.length != 0)keys = Object.getOwnPropertyNames(dataForChart[0]);
           var numberOfKeys = keys.length;
           var length = dataForChart.length;
           var dateIndex = keys.indexOf("date");
           var valIndex = keys.indexOf("value");
           var customDataHome = [];
           var customDataCompare = [];

           for (var i = 0 ; i < length ; i++) {
                var now = new Date(dataForChart[i][keys[dateIndex]]);
                var now_utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
                if($state.current.name == "tdp.home"){
                    customDataHome.push([now_utc , dataForChart[i][keys[valIndex]]]);
                }else
                    customDataHome.push([now_utc , $scope.$parent.dataInvest[i]]);
                if(dataForCompare.length != 0)  {
                    customDataCompare.push([now_utc , dataForCompare[i]]);
                }
           }

           if($state.current.name == "tdp.compare") {
                $scope.chartConfig.series = [{
                    name: "Home",
                    data: customDataHome},
                    {
                    name: "compare",
                    data: customDataCompare
                    }]
           } else {
                $scope.chartConfig.series = [{
                name: "Home",
                data: customDataHome}]
             }
     })

    $scope.chartConfig = {
        xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Date'
                }
            },
                series: [{
                    data: []
                }]
    };
    });
});