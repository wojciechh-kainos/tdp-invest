define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, $stateParams, tdpDataService) {
        var createChart = function(dateList, valuesList){
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

        tdpDataService.getInvestData().then(function(response){
            $scope.investData = response.data;

            dateList = []
            valuesList = []
            for (i = 0; i < response.data.length; i++) {
                dateList.push(response.data[i].date.month);
                valuesList.push(response.data[i].value)
            }

            createChart(dateList, valuesList);
        });

        $scope.submitRange = function(){
            if(typeof $scope.start !== undefined && typeof $scope.end !== undefined){

                dateList = []
                valuesList = []
                var start = new Date($scope.start);
                var end = new Date ($scope.end);
                for (i = 0; i < $scope.investData.length; i++) {
                    var date = new Date($scope.investData[i].date.year + "-" + $scope.investData[i].date.monthValue + "-" + $scope.investData[i].date.dayOfMonth);
                    if( date > start && date < end){
                        dateList.push($scope.investData[i].date.month);
                        valuesList.push($scope.investData[i].value)
                    }
                }

                createChart(dateList, valuesList);
            }
        }

    });
});
