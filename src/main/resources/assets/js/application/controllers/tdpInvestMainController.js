define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, $stateParams, tdpDataService) {
        var investData = [];
        tdpDataService.getInvestData().then(function(response){
            investData = response.data;
            var dateList = []
            var valuesList = []
            $scope.tableData = investData;

            for (i = 0; i < response.data.length; i++) {
                dateList.push(response.data[i].date.month);
                valuesList.push(response.data[i].value)
            }

            createChart(dateList, valuesList);
        });

        $scope.submitRange = function(){
            if(typeof $scope.start !== undefined && typeof $scope.end !== undefined){
                var dateList = []
                var valuesList = []
                $scope.tableData = [];

                var start = new Date($scope.start);
                var end = new Date ($scope.end);
                for (i = 0; i < investData.length; i++) {
                    var date = new Date(investData[i].date.year + "-" + investData[i].date.monthValue + "-" + investData[i].date.dayOfMonth);
                    if( date > start && date < end){
                        $scope.tableData.push(investData[i]);
                        dateList.push(investData[i].date.month);
                        valuesList.push(investData[i].value)
                    }
                }

                createChart(dateList, valuesList);
            }
        }

        function createChart(dateList, valuesList){
            Highcharts.chart('container', {
                xAxis: {
                    title: {
                        text: 'Month'
                    },
                    categories: dateList
                    },
                    yAxis: {
                         title: {
                                text: 'Value'
                         }
                    },

                    series: [{
                        data: valuesList
                    }]
                });
        };

    });
});
