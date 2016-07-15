define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpCompareService) {

        $scope.start_date = new Date(2015, 7, 20);
        $scope.end_date = new Date();

        $scope.investData = [];
        $scope.input_value_state = true;
        $scope.interest_rate_state = true;
        $scope.show_button = true;

        $scope.showInvest = function(date1, date2, input_value, interest_rate) {

            input_value = parseFloat(input_value);
            interest_rate = parseFloat(interest_rate)/100;

            console.log(interest_rate);

            var oneDay = 24 * 60 * 60 * 1000;
            var diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));
            console.log(diffDays);
            var rate = parseFloat((input_value * interest_rate / 365).toFixed(5));
            console.log(rate);
            var invest = [];
            var nextDay = new Date();
            var nextPrice;

            invest.push({
                date: createDate(date1),
                price: input_value
            });

            for (var i = 1; i < diffDays; i++) {
                nextPrice = invest[i - 1].price + rate;
                nextDay.setTime(date1.getTime() + oneDay * i);
                invest.push({
                    date: createDate(nextDay),
                    price: nextPrice
                });
            }

            return invest;
        }

        function createDate(date) {
            var day = date.getUTCDate();
            var month = date.getUTCMonth() + 1;
            var year = date.getUTCFullYear();

            if (month < 10)
                month = "0" + month;
            if (day < 10)
                day = "0" + day;

            return year + "-" + month + "-" + day;
        }

        $scope.setInvestData = function(data) {
            console.log(data);
            $scope.investData = data;
        }


        $scope.getStockData = function(date1, date2) {
            tdpCompareService.getDataRange(date1, date2)
                .then(function(response) {
                    $scope.stockData = response.data;
                });
        }

        $scope.getStockData($scope.start_date, $scope.end_date);

        $scope.$watch('interest_rate', function(){
            if($scope.interest_rate > 100 || $scope.interest_rate < 0 || $scope.interest_rate == undefined || $scope.interest_rate == '' || !isNumber($scope.interest_rate)){
                $scope.interest_rate_error = "Please put right value of rate: 0 <= rate <= 100";
                $scope.interest_rate_state = false;
            }else{
                $scope.interest_rate_error = "";
                $scope.interest_rate_state = true;
            }
            $scope.show_button = !($scope.interest_rate_state && $scope.input_value_state);
            console.log($scope.interest_rate_state + " && " + $scope.input_value_state + " = " + ($scope.interest_rate_state && $scope.input_value_state) + "\n");
        });

        $scope.$watch('input_value', function(){
            if($scope.input_value == undefined || $scope.input_value == '' || !isNumber($scope.input_value)){
                $scope.input_value_error = "Please fill the field";
                $scope.input_value_state = false;
            }else{
                $scope.input_value_error = "";
                $scope.input_value_state = true;
            }
            $scope.show_button = !($scope.interest_rate_state && $scope.input_value_state);
            console.log($scope.interest_rate_state + " && " + $scope.input_value_state + " = " + ($scope.interest_rate_state && $scope.input_value_state) + "\n");

        });


    });
});

function isNumber(n){
    if(!isNaN(n))
       return true;
    return false;
}