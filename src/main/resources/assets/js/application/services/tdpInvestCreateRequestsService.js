define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule, tdpInvestCreateRequestsService) {
    tdpInvestModule.service("tdpInvestCreateRequestsService", function($http, $q) {

        var datesTmp = [];

        makeDate = function(date){
            var d = new Date(date);
            d.setHours(0,0,0,0);
            return new Date(d).getTime();
        }

        makeRequest = function(p, k){
            return {p : p, k : k};
        }

        this.compareDates = function(date1, date2){
             if(makeDate(date1.p) >= makeDate(date2.p))
                 return 1;
             return -1;
        }

        this.compareDatesAndPrices = function(a, b){
            if(makeDate(a.date) >= makeDate(b.date))
                return 1;
            return -1;
        }

        mergeDates = function(dates){
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

        this.getStockDataFromDates = function(dates, start_date, end_date){
            stock_data = [];
            for(i = 0; i < dates.length; i++){
                if(makeDate(dates[i].date) >= makeDate(start_date) && makeDate(dates[i].date) <= makeDate(end_date)){
                    stock_data.push({date : dates[i].date, price : dates[i].price});
                }
            }
            return stock_data;
        }

        this.createDateRequests = function(dates, start_date, end_date){
            var request = [];

            if(dates === undefined){
                return request;
            }
            dates.sort(this.compareDates);

            var T0 = start_date;
            var TX = end_date;
            var tmp;

            if(dates.length == 0){
                request.push(makeRequest(T0, TX));
                dates.push({p : T0, k : TX});
                data = {dates : dates, requests : request};
                return data;
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
                    }else if(makeDate(TX) <= makeDate(dates[i].k)){
                        request.push(makeRequest(T0, dates[i].p));
                        tmp = T0;
                        T0 = dates[i].k;
                        dates[i].p = tmp;
                        break;
                    }
                    request.push(makeRequest(T0, dates[i].p));
                    tmp = T0;
                    T0 = dates[i].k;
                    dates[i].p = tmp;
                }
                if(i == dates.length - 1){
                    if(makeDate(TX) > makeDate(dates[i].k))
                        request.push(makeRequest(dates[i].k, TX));
                        dates[i].k = TX;
                    break;
                }
            }

            dates = mergeDates(dates);

            data = {dates : dates, requests : request};

            return data;
        }

        this.getDataRange = function(requests){
            var data = {
                requests : requests
            };
            var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            }
            return $http.post("/api/compare/date", data, config);
        }

        this.getStockData = function(date1, date2, datesIntervals, datesAndPrices){
            getStockDataFromDates = this.getStockDataFromDates;
            var data = this.createDateRequests(datesIntervals, date1, date2);
            if(data.requests[0] === undefined){
                stockData = this.getStockDataFromDates(datesAndPrices, date1, date2);
                var message = {stockData : stockData, datesIntervals : datesIntervals, datesAndPrices : datesAndPrices};
                return $q.when(message);
            }
            requests = data.requests;
            datesTmp = data.dates;
            message = this.getDataRange(requests)
            .then(function(response) {
                for(i = 0; i < response.data.length; i++){
                    datesAndPrices.push({date : response.data[i].date, price : response.data[i].price});
                }
                datesAndPrices.sort(this.compareDatesAndPrices);
                datesIntervals = datesTmp;
                stockData = this.getStockDataFromDates(datesAndPrices, date1, date2);
                var message = {stockData : stockData, datesIntervals : datesIntervals, datesAndPrices : datesAndPrices};
                return message;
            });
            return $q.when(message);
        }
    });
});


//Dodajemy serwis do zebrania danych z javy ($http.get(sciezka /api/'to co daliśmy w @Path'))