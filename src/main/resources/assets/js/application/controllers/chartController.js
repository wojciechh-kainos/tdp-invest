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
                    num = dataForChart.length;
                    var customData = [];
                    for (var i = 0 ; i < num ; i++) {
                    var now = new Date(dataForChart[i].date);
                    var now_utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
                    console.log(now_utc);
                        customData.push([now_utc , dataForChart[i].value]);
                    }
                          $scope.chartConfig.series = [{
                              data: customData}]

                })

    $scope.chartConfig = {
        xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
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