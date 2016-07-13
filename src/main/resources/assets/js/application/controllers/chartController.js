define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("chartController", function($scope, $state, $stateParams,$filter,DataService, dataUrl) {

    $scope.swapChartType = function() {
        if(this.chartConfig.options.chart.type == 'spline')
            this.chartConfig.options.chart.type = 'bar';
        else
            this.chartConfig.options.chart.type = 'spline';
    }

    $scope.changeTitle = function(){
        this.chartConfig.title.text = $scope.$parent.receivedData[0].date;
    }


  $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }

     $scope.$watch('receivedData', function() {
                    var dataForChart = $scope.$parent.receivedData;
                    var keys = [];

                    keys = Object.getOwnPropertyNames(dataForChart[0]);
                    var numberOfKeys = keys.length;


                    num = dataForChart.length;
                    var customDataHome = [];
                    var customDataCompare = [];
                    for (var i = 0 ; i < num ; i++) {
                        var now = new Date(dataForChart[i][keys[0]]);
                        var now_utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
                        customDataHome.push([now_utc , dataForChart[i][keys[1]]]);
                     if(numberOfKeys == 3)  {
                        customDataCompare.push([now_utc , dataForChart[i][keys[2]]]);
                      }
                    }
                   if(numberOfKeys == 3) {
                        $scope.chartConfig.series = [{
                            name: "Home",
                            data: customDataHome},
                            {
                            name: "compare",
                            data: customDataCompare
                            }]
                   }
                   else {
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