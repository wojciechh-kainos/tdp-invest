define(['angular', 'application/tdpInvestModule', 'application/services/tdpCompareService'], function(angular, tdpInvestModule) {
    tdpInvestModule.controller("tdpInvestDateController", function($scope, $stateParams, tdpCompareService) {
        $scope.test = "";

        $scope.dates = [
            {
                p : '2016-01-01',
                k : '2016-02-01'
            },

             {
                 p : '2016-06-01',
                 k : '2016-08-01'
             },
             {
                 p : '2016-03-01',
                 k : '2016-04-01'
             },
             {
                 p : '2016-09-05',
                 k : '2016-09-20'
             }

        ];

        $scope.start_date = '2015-08-13';
        $scope.end_date = '2016-08-19';

        $scope.getStockDataMany = function(date1, date2){
            requests = $scope.createDateRequests($scope.dates, date1, date2).requests;
            console.log(requests);
            tdpCompareService.getDataRangeMany(requests)
            .then(function(response) {
                for(i = 0; i < response.data.length; i++){
                    console.log(response.data[i].date + " : " + response.data[i].price + "\n");
                }
            });
        }

        $scope.createDateRequests = function (dates, start_date, end_date){

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
            for(var i = 0; i < request.length; i++){
                $scope.test += "P = " + request[i].p + " K = " + request[i].k + ", ";
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
    });
});

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