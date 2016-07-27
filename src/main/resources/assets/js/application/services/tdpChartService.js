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


        this.createChartWithTwoSeries = function(type, date, investValues, stockValues ){
             Highcharts.chart(type, {
                     title: {
                         text: 'Investment chart'
                     },

                     xAxis: {
                         title: {
                              text: 'Year'
                         },
                         categories: date
                     },

                     yAxis: {
                          title: {
                                 text: 'Value'
                          }
                     },

                     series: [{
                         data: investValues,
                         name: 'Investment',
                         step: 'left'
                     },
                     {
                         data: stockValues,
                         name: 'Stock',
                         step: 'left'
                     }]
                 });
     }

    })
});