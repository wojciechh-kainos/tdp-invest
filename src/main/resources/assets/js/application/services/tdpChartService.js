define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpChartService", function($http) {
        this.createChart = function(dateList, valuesList){
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
        }
    })
});