define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, $stateParams, tdpDataService) {

        var investData = [];
        var startDate = false;
        var endDate = false;

        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.filteredDataForView = [];
        $scope.dataChanged = false;

        tdpDataService.getInvestData().then(function(response){
            prepareChart(response.data)
            investData = response.data;
            $scope.$watch("[currentPage + numPerPage, dataChanged]", function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = begin + $scope.numPerPage;

                $scope.filteredDataForView = $scope.dataForView.slice(begin, end);
                $scope.dataChanged = false;
            });

        });

        $scope.submitRange = function(){
            startDate = new Date($scope.startDate);
            endDate = new Date ($scope.endDate);
            prepareChart(investData)
            $scope.dataChanged = true;
            $scope.currentPage = 1;
        }

        function dateFilter(record){
                if(startDate == false || endDate == false){
                    return true;
                }

                var date = new Date(record.date.year + "-" + record.date.monthValue + "-" + record.date.dayOfMonth);
                if(date > startDate && date < endDate)
                       return true;
                return false;
        }

        function prepareChart(recordList){
               var dateList = []
               var valuesList = []

               recordList = recordList.filter(dateFilter);
               $scope.dataForView = recordList;

               for (i = 0; i < recordList.length; i++) {
                   dateList.push(getDateString(recordList[i].date));
                   valuesList.push(recordList[i].value)
               }

               createChart(dateList, valuesList);
        }

        function createChart(dateList, valuesList){
            Highcharts.chart('container', {
                xAxis: {
                    title: {
                        text: 'Date'
                    },
                    categories: dateList
                },
                yAxis: {
                     title: {
                            text: 'Value'
                     }
                },
                series: [{
                    data: valuesList,
                    name: 'Stock',
                    step: 'left'
                }]
                });
        };


        function getDateString(date) {
            var newDate = new Date(date.year + "-" + date.monthValue + "-" + date.dayOfMonth);

            return newDate.toISOString().slice(0,10).replace(/-/g,".");
        };

    });
});
