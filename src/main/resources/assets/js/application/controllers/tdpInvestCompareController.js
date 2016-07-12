define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpCompareService) {

        tdpCompareService.getData()
        .then(function(response) {
            //data came from java ;)

            $scope.message = response.data;


            //data
            var collection = $scope.message;

            //sort on price first
            //sort - which column should be sorted
            $scope.sort = 'price';
            //reverse - if sort should be reverse or not
            $scope.reverse = false;
            //we can sort only one column in one time

            $scope.sortTable = function (sort){
                if($scope.sort === sort){
                    //if the same as previously sort should me reverse
                    $scope.reverse = !$scope.reverse;
                }
                $scope.sort = sort;
            }
            $scope.collection = collection;

            //create data arrays for chart
            var prices = [];
            var dates = [];
            for(i=0; i<$scope.collection.length; i++){
                prices.push(parseFloat(collection[i].price));
                dates.push(collection[i].date);
            }
//------------- chart ------------------------
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
               height: 400
              },
              //function (optional)
              func: function (chart) {
               //setup some logic for the chart
              }
            };
//------------------ end of chart -------------------------

        });
    }, function(error) {
        // Data income fails
        $scope.message = error;
    });
});
