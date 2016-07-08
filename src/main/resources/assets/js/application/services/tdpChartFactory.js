define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.factory('chartFactory', function() {
        var ChartConfig = function(series, categories, title, subtitle) {
            this.config = {

              options: {
                  chart: {
                      type: 'spline'
                  },
                  tooltip: {
                      valueSuffix: ' PLN'
                  },
              },

              title: {
                  text: title
              },
              subtitle: {
                  text: subtitle
              },
              xAxis: {
                  categories: categories
              },
              yAxis: {
                  title: {
                      text: 'Value [PLN]'
                  },
                  minorGridLineWidth: 0,
                  gridLineWidth: 0,
                  alternateGridColor: null
              },
              tooltip: {
                  valueSuffix: ' PLN'
              },
              series: series,
              navigation: {
                  menuItemStyle: {
                      fontSize: '10px'
                  }
              }
            };
        };

        return ChartConfig;
    });

)};