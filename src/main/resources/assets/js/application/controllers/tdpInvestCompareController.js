define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestCompareController", function($scope, $stateParams, tdpCompareService) {

        $scope.start_date = new Date(2015, 7, 16);
        $scope.end_date = new Date();

        $scope.stockData = [];
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
                    $scope.stockData = [];
                    $scope.stockData = response.data;
                    console.log(response.data);
                });
        }

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

        $scope.getStockData($scope.start_date, $scope.end_date);




    });
});

function isNumber(n){
    if(!isNaN(n))
       return true;
    return false;
}

function makeDate(date){
    return new Date(date).getTime();
}

function makeRequest(p, k){
    console.log("Create request: p = " + p + " K = " + k + "\n");
    return {p : p, k : k};
}

function compareDates(date1, date2){
    if(makeDate(date1.p) >= makeDate(date2.p))
        return 1;
    return -1;
}

function mergeDates(dates){
    var tmp;
    var i = 0;
    while(dates.length > i + 1){
        if(makeDate(dates[i].k) == makeDate(dates[i + 1].p)){
            dates[i].k = dates[i + 1].k;
            dates.splice(i + 1, 1);
        }else{
            i++;
        }
    }
    return dates;
}

function createDateRequests(dates, start_date, end_date){

    dates.sort(compareDates);

    console.log("Daty w tablicy: \n");
    for(var i = 0; i < dates.length; i++){
        console.log(dates[i].p + " - " + dates[i].k + "\n");
    }

    var request = [];

    var T0 = start_date;
    var TX = end_date;
    var tmp;

    for(var i = 0; i < dates.length; i++){
        console.log("tutaj");

        if(makeDate(T0) < makeDate(dates[i].p)){
            if(i != 0 && makeDate(T0) <= makeDate(dates[i - 1].k)){
                if(makeDate(TX) < makeDate(dates[i - 1].k))
                    break;
                T0 = dates[i-1].k;
                console.log("tutaj: " + T0 + "\n");
            }
            if(makeDate(TX) < makeDate(dates[i].p)){
                request.push(makeRequest(T0, TX));

                dates.push({p : T0, k : TX});

                dates.sort(compareDates);
                break;
            }
            else if(makeDate(TX) < makeDate(dates[i].k)){
                request.push(makeRequest(T0, dates[i].p));
                tmp = T0;
                T0 = dates[i].p;
                dates[i].p = tmp;
                break;
            }
            request.push(makeRequest(T0, dates[i].p));
            tmp = T0;
            T0 = dates[i].k;
            dates[i].p = tmp;
            dates.sort(compareDates);

            if(i == dates.length - 1){
                if(makeDate(TX) > makeDate(dates[i].k))
                    request.push(makeRequest(dates[i].k, TX));
                    dates[i].k = TX;
                break;
            }
        }

    }

    console.log("Wyjściowe daty :\n");
    for(var i = 0; i < dates.length; i++)
        console.log(dates[i].p + " - " + dates[i].k + "\n")

    dates = mergeDates(dates);
    console.log("Wyjściowe daty :\n");
    for(var i = 0; i < dates.length; i++)
        console.log(dates[i].p + " - " + dates[i].k + "\n")



    data = {dates : dates, requests : request};

    return data;
}