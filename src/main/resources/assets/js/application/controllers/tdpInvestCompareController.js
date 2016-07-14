define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpDataService) {

        tdpDataService.getInvestData().then(function(response){
            $scope.investData = response.data;
        });

        $scope.submit = function(){

            if(typeof $scope.start !== undefined && typeof $scope.end !== undefined){

                var valuesList = [];
                var dateList = [];

                var startDate = new Date($scope.startDate);
                var endDate = new Date($scope.endDate);
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
                var stockValuesList = []

                var stockGain = $scope.amount;
                var unitNumber = $scope.amount / $scope.investData[0].value;

                for(i = 1; i < days; i++){
                    stockValuesList.push(stockGain);
                    stockGain = unitNumber * $scope.investData[i].value;
                }

                prepareChart('investmentChart', dateList, valuesList, stockValuesList);

            }
        }

        function getDateString(date) {
                return date.toISOString().slice(0,10).replace(/-/g,".");
        };


        function prepareChart(type, date, investValues, stockValues ){
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

        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        function dateDiffInDays(a, b) {
              var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
              var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
              return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2150, 01, 01),
            minDate: new Date(1950, 01, 01)
        };

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.format = 'dd.MM.yyyy';
        $scope.altInputFormats = ['M!/d!/yyyy'];

         $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };
    });
});
