define(['angular', 'application/tdpInvestModule', 'application/services/tdpInvestCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestDateController", function($scope, $stateParams, tdpInvestCompareService) {
        $scope.test = "";

        $scope.datesIntervals = [];

        $scope.datesAndPrices = [];

        $scope.start_date = '2014-08-13';
        $scope.end_date = '2017-03-03';

        $scope.getStockDataMany = function(date1, date2){
            var data = createDateRequests($scope.datesIntervals, date1, date2);
            if(data.length == 0){
                $scope.stockData = getStockDataFromDates($scope.datesAndPrices, $scope.start_date, $scope.end_date);
                return 1;
            }
            requests = data.requests;
            $scope.datesTmp = data.datesIntervals;
            tdpInvestCompareService.getDataRangeMany(requests)
            .then(function(response) {
                for(i = 0; i < response.data.length; i++){
                    $scope.datesAndPrices.push({date : response.data[i].date, price : response.data[i].price});
                }
                $scope.datesAndPrices.sort(compareDatesAndPrices);
                $scope.datesIntervals = $scope.datesTmp;
                $scope.stockData = getStockDataFromDates($scope.datesAndPrices, $scope.start_date, $scope.end_date);
            });
        }
    });
});

function makeDate(date){
    return new Date(date).getTime();
}

function makeRequest(p, k){
    return {p : p, k : k};
}

function compareDates(date1, date2){
    if(makeDate(date1.p) >= makeDate(date2.p))
        return 1;
    return -1;
}

function compareDatesAndPrices(a, b){
    if(makeDate(a.date) >= makeDate(b.date))
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

function getStockDataFromDates(dates, start_date, end_date){
    stock_data = [];
    for(i = 0; i < dates.length; i++){
        if(dates[i].date >= start_date && dates[i].date <= end_date)
            stock_data.push({date : dates[i].date, price : dates[i].price});
    }
    return stock_data;
}

function createDateRequests(dates, start_date, end_date){
    var request = [];
    //do poprawki :)
    if(dates === undefined){
        return request;
    }
    dates.sort(compareDates);

    console.log("Daty w tablicy: \n");
    for(var i = 0; i < dates.length; i++){
        console.log(dates[i].p + " - " + dates[i].k + "\n");
    }

    var T0 = start_date;
    var TX = end_date;
    var tmp;

    if(dates.length == 0){
        request.push(makeRequest(T0, TX));
        dates.push({p : T0, k : TX});
    }

    for(var i = 0; i < dates.length; i++){
        if(makeDate(T0) < makeDate(dates[i].p)){
            if(i != 0 && makeDate(T0) <= makeDate(dates[i - 1].k)){
                if(makeDate(TX) <= makeDate(dates[i - 1].k))
                    break;
                T0 = dates[i-1].k;
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