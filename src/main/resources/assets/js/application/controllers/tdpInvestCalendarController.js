define(['angular', 'application/tdpInvestModule', 'ui-bootstrap', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
tdpInvestModule.controller("tdpInvestCalendarController", function($scope, $stateParams, tdpCompareService) {
        $scope.start_date = new Date();
        $scope.end_date = new Date(2016, 7, 20);

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        $scope.getStockData = function(date1, date2) {
            tdpCompareService.getDataRange(date1, date2)
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

                        $scope.filteredCollection = [];
                        $scope.currentPage = 1;
                        $scope.numPerPage = 10;
                        $scope.maxSize = 5;

                        $scope.$watch('currentPage + numPerPage', function() {
                            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                                end = begin + $scope.numPerPage;

                            $scope.filteredCollection = $scope.collection.slice(begin, end);
                        });

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

        }
        });
});