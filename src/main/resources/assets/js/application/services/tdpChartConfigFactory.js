define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.factory('ChartConfigFactory', function() {
        var config =  function(title, subtitle, series, categories) {
            return {
              options: {
                  chart: {
                      zoomType: 'x'
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
                  categories: categories,
              },
              yAxis: {
                  title: {
                      text: 'Value [PLN]'
                  },
                  minorGridLineWidth: 1,
                  gridLineWidth: 1,
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
    return config;
    });

});