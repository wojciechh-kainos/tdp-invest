define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, $stateParams, tdpDataService) {
        var dataFromServer = [];

        tdpDataService.getInvestData().then(function(response){
            var dataFromServer = response.data;
            $scope.dataForView = dataFromServer;

            createChart($scope.dataForView);

            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.maxSize = 5;
            $scope.filteredDataForView = [];
            $scope.dataChanged = false;

            $scope.$watch("[currentPage + numPerPage, dataChanged]", function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = begin + $scope.numPerPage;

                $scope.filteredDataForView = $scope.dataForView.slice(begin, end);
                $scope.dataChanged = false;
            });

            $scope.submitRange = function(){
                $scope.dataForView = [];

                var start = new Date($scope.start);
                var end = new Date ($scope.end);
                for (i = 0; i < dataFromServer.length; i++) {
                    var date = new Date(dataFromServer[i].date.year + "-" + dataFromServer[i].date.monthValue + "-" + dataFromServer[i].date.dayOfMonth);
                    if( date > start && date < end){
                        $scope.dataForView.push(dataFromServer[i]);
                    }
                }
                $scope.dataChanged = true;
                $scope.currentPage = 1;
                createChart($scope.dataForView);
            }

        });

        function createChart(data){
            var dateList = []
            var valuesList = []

            for (i = 0; i < data.length; i++) {
                dateList.push(data[i].date.month);
                valuesList.push(data[i].value)
            }

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
