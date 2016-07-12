define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpCompareService) {

    tdpCompareService.getData()
        .then(function(response) {
                $scope.message = response.data;
                var collection = $scope.message;
                console.log(collection);
                //sort on date
                $scope.sort = 'price';
                $scope.reverse = false;

                $scope.sortTable = function(sort) {
                    console.log($scope.sort);
                    console.log(sort);
                    if ($scope.sort === sort) {
                        $scope.reverse = !$scope.reverse;
                    }
                    $scope.sort = sort;
                }

                $scope.collection = collection;

                $scope.filteredCollection = [];
                $scope.currentPage = 1;
                $scope.numPerPage = 10;
                $scope.maxSize = 5;

                $scope.$watch('currentPage + numPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                        end = begin + $scope.numPerPage;

                    $scope.filteredCollection = $scope.collection.slice(begin, end);
                });

                //for chart
                var prices = [];
                var dates = [];
                for (i = 0; i < collection.length; i++) {
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
                               height: 400
                              },
                              //function (optional)
                              func: function (chart) {
                               //setup some logic for the chart
                              }
                            };

                        });
                    }, function(error) {
                        // W przypadku nie dojścia danych z javy
                        $scope.message = error;
                    });
                });