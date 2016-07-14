define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpDataService) {

        var startDate = false;
        var endDate = false;

        tdpDataService.getInvestData().then(function(response){
            $scope.investData = response.data;

            dateList = []
            valuesList = []
            for (i = 0; i < response.data.length; i++) {
                dateList.push(response.data[i].date.month);
                valuesList.push(response.data[i].value)
            }
            prepareChart('container', dateList, valuesList);
        });

        $scope.submit = function(){

            if(typeof $scope.start !== undefined && typeof $scope.end !== undefined){

                var valuesList = [];
                var dateList = [];

                var startDate = new Date($scope.start);
                var endDate = new Date($scope.end);
                var countedDate = startDate;

                var gain = $scope.amount;
                var daysInYear = 365;

                var days = dateDiffInDays(startDate, endDate);
                var investOptionInDays = Math.floor(daysInYear / $scope.investOption);
                var counter = 1;
                var investPeriodsInYearNumber = $scope.investOption;
                var investPercent = $scope.annualInterest/100;

                dateList.push(getDateString(startDate));
                valuesList.push(gain);

                for(i = 0; i <= days; i++){

                    if(counter == investOptionInDays || investOptionInDays == 1){
                        gain = gain * ((investPercent/investPeriodsInYearNumber) + 1);
                        counter = 1;
                    }

                    valuesList.push(gain);

                    countedDate = new Date(countedDate.setDate(countedDate.getDate()+1));
                    dateList.push(getDateString(countedDate));

                    counter += 1;
                }

                $scope.gain = gain;
                prepareChart('investmentChart', dateList, valuesList);
            }
        }

        function getDateString(date) {
                return date.toISOString().slice(0,10).replace(/-/g,".");
        };


        function prepareChart(type, date, values){
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
                            data: values,
                            name: 'Stock',
                            step: 'left'
                        }]
                    });
        }


        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        function dateDiffInDays(a, b) {
              var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
              var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

              return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }

    });
});
