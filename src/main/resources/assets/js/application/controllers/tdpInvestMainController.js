define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestMainController", function($scope, $stateParams, tdpDataService) {

                tdpDataService.getInvestData().then(function(response){
                    $scope.investData = response.data;

                    dateList = []
                    valuesList = []
                    for (i = 0; i < response.data.length; i++) {
                        dateList.push(response.data[i].date.month);
                        valuesList.push(response.data[i].value)
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

        });
    });
});
