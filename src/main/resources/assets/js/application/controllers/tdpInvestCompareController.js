define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestStockDataService', 'ui-bootstrap', 'application/directive/tdpInvestShowErrors',], function (angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", ['$scope', '$stateParams', 'stockData', '$state', function ($scope, $stateParams, stockData, $state) {


        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
        
        $scope.format = 'yyyy-MM-dd';

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'column'
                },

                tooltip: {
                    pointFormat: 'Income: {point.y:.2f}'
                },
                title: {
                    text: ''
                }
            },
            xAxis: {
                categories: ['Deposit', 'Fund']
            },
            series: [
                {
                    id: 1,
                    data: [],
                    color: '#E8CE1C',
                    showInLegend: false
                }
            ]

        };



        function getValueAtDate(date){
            var val = stockData.getData().find(function (unit) {
                return unit[0] >= date.getTime();
            });
            return val[1];
        }



        $scope.fill = function () {
            $scope.form = {
                startDate: new Date(2001, 2, 9),
                endDate: new Date(2012, 5, 5),
                amount: 10000,
                interestRate: 5.5,
                captInterval: 30
            }
        };

        function calculateStockInvestIncome() {
            var form = $scope.form;
            var startVal = getValueAtDate(form.startDate);
            var endVal = getValueAtDate(form.endDate);
            return form.amount * (endVal - startVal) / startVal;
        }

        function calculateDepositInvestIncome() {
            var form = $scope.form;
            var daysPassed = (form.endDate.getTime() - form.startDate.getTime()) / 86400000;
            var capitalizations = Math.floor(daysPassed / form.captInterval);
            var intrestRatePerCaptInterval = form.interestRate * form.captInterval / 365;
            return form.amount * (Math.pow((1 + intrestRatePerCaptInterval/100), capitalizations) - 1);
        }


        $scope.submit = function () {
            $scope.$broadcast('show-errors-check-validity');

            if ($scope.compareForm.$invalid) { return; }

            $scope.chartConfig.series[0].data = [calculateDepositInvestIncome(), calculateStockInvestIncome()];

            $state.go('tdp.compare.calculated');
        };

    }]);

});
