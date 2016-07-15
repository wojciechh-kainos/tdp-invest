define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpCompareService) {

        $scope.start_date = new Date(2015, 7, 20);
        $scope.end_date = new Date();

        $scope.showInvest = function(date1, date2, input_value, interest_rate) {

            input_value = parseFloat(input_value);
            interest_rate = parseFloat(interest_rate);

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

        $scope.createInvestChart = function(data) {
            $scope.investData = data;
            $scope.investPrices = [];
            $scope.dates = [];
            for (i = 0; i < $scope.stockData.length; i++) {
                $scope.investPrices.push(parseFloat($scope.investData[i].price));
                $scope.dates.push($scope.investData[i].date);
            }
        }


        $scope.getStockData = function(date1, date2) {
            tdpCompareService.getDataRange(date1, date2)
                .then(function(response) {
                    $scope.stockData = response.data;
                    console.log("dupa");
                });

        }

        $scope.getStockData($scope.start_date, $scope.end_date);
    });
});