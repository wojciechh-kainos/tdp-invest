define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams) {

        //data
        var collection = [];
        //sort on date
        $scope.sort = 'price';
        $scope.reverse = false;

        $scope.sortTable = function (sort){
            console.log($scope.sort);
            console.log(sort);
            if($scope.sort === sort){
                $scope.reverse = !$scope.reverse;
            }
            $scope.sort = sort;
        }

        //temporary data generator
        function generate(n){
            var collection = [];

            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var y = date.getFullYear();

            for(var i = 0; i < n; i++){
                date = dd + "-" + mm + "-" + y;
                price = (Math.random() * (3.120 - 0.0200) + 0.0200).toFixed(4);
                collection.push({date : date, price : price});
                dd++;
             }
             return collection;
        }

        collection = generate(20);
        $scope.collection = collection;

        //for chart
        var prices = [];
        var dates = [];
        for(i=0; i<collection.length; i++){
            prices.push(parseFloat(collection[i].price));
            dates.push(collection[i].date);
        }

        console.log(prices);

        $scope.chartConfig = {

          options: {
              //This is the Main Highcharts chart config. Any Highchart options are valid here.
              //will be overriden by values specified below.
              chart: {
                  type: 'line'
              },
              tooltip: {
                  style: {
                      padding: 10,
                      fontWeight: 'bold'
                  }
              }
          },
          //The below properties are watched separately for changes.

          //Series object (optional) - a list of series using normal Highcharts series options.
          series: [{
                showInLegend : false,
                data : prices
          }],
          //Title configuration (optional)
          title: {
             text: 'Stock prices'
          },
          //Boolean to control showing loading status on chart (optional)
          //Could be a string if you want to show specific loading text.
          loading: false,
          //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
          //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
          xAxis: {
          title: {text: 'Date'},
          categories : dates
          },

          yAxis: {
              title: {text: 'Price'},
          },
          //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
          useHighStocks: false,
          //size (optional) if left out the chart will default to size of the div or something sensible.
          size: {
           width: 1200,
           height: 400
          },
          //function (optional)
          func: function (chart) {
           //setup some logic for the chart
          }
        };

    });
});
