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
                    console.log(new Date($scope.$parent.receivedData[0].date));

                    var customData = [];
                    for (var i = 0 ; i < 2 ; i++){
                        customData.push([$scope.$parent.receivedData[i].date,$scope.$parent.receivedData[i].value]);
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