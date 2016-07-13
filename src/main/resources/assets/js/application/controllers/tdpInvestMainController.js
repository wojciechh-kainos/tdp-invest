define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, $stateParams, tdpDataService) {

        var investData = [];
        var start = false;
        var end = false;

        function dateFilter(record){
                if(start == false || end == false){
                    return true;
                }

                var date = new Date(record.date.year + "-" + record.date.monthValue + "-" + record.date.dayOfMonth);
                if(date > start && date < end)
                       return true;
                return false;
        }

        function prepareChart(recordList){
               var dateList = []
               var valuesList = []

               recordList = recordList.filter(dateFilter);
               $scope.tableData = recordList;

               for (i = 0; i < recordList.length; i++) {
                   dateList.push(recordList[i].date.month);
                   valuesList.push(recordList[i].value)
               }

               createChart(dateList, valuesList);
        }

        tdpDataService.getInvestData().then(function(response){
            prepareChart(response.data)
        });

        $scope.submitRange = function(){
              start = new Date($scope.start);
              end = new Date ($scope.end);
              prepareChart($scope.tableData)
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
