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

            if(typeof $scope.start !== undefined && typeof $scope.end !== undefined){
                var capitalizationPeriod = 365;
                var daysBetween = daydiff(new Date($scope.start), new Date($scope.end));
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
    });
});
