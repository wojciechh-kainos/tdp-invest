define(['angular', 'application/tdpInvestModule', 'application/services/tdpDataService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpDataService) {
        tdpDataService.getInvestData().then(function(response){
            $scope.investData = response.data;

            dateList = []
            valuesList = []
            for (i = 0; i < response.data.length; i++) {
                dateList.push(response.data[i].date.month);
                valuesList.push(response.data[i].value)
            }

            Highcharts.chart('container', {
                xAxis: {
                    title: {
                         text: 'Miesiąc'
                    },
                    categories: dateList
                },

                yAxis: {
                     title: {
                            text: 'Wartości'
                     }
                },

                series: [{
                    data: valuesList
                }]
            });
        });

        $scope.submit = function(){

            function daydiff(first, second) {
                return Math.round((second-first)/(1000*60*60*24));
            }

            if(typeof $scope.startDate !== undefined && typeof $scope.endDate !== undefined){
                var capitalizationPeriod = 365;
                var daysBetween = daydiff(new Date($scope.startDate), new Date($scope.endDate));
                var dailyInterest = $scope.annualInterest / capitalizationPeriod;
                var gain = $scope.amount;
                for(var i = 0; i < daysBetween; i++){
                    if(i % capitalizationPeriod == 0 || i == daysBetween-1){
                        gain += i%capitalizationPeriod * dailyInterest;
                    }
                }
                $scope.gain = gain;
            }
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
