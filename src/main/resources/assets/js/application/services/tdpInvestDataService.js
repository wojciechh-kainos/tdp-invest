define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpInvestDataService", function($http, $q) {
        this.getRows = function(url, startDate, endDate) {
                return $http.get(url, {params: {startDate: startDate, endDate: endDate}}).then(function(response) {
                        return response.data;
                    }, function(failure) {
                        return "getRows request has failed. Status code: " + failure.status;
                    }
                );
        }

        this.TESTINGPROMISES = function(url) {
            return $http.get(url).then(function(response) {
                return response.data;
            }, function(failure) {
                if(failure.status == "400") {
                    return "There are no records for these input params";
                }
                if (failure.status == "500") {
                    return "Server error!";
                }
            });
        }

        this.calculateFundIncome = function (input , dataInc) {
               if (dataInc.length == 0) return result;
               var number = Math.round( input/dataInc[0].value );
               var result = [];
               var length = dataInc.length;
               for (var i = 0 ; i < length ; i++){
                    var dayIncome = (number * dataInc[i].value) - (number * dataInc[0].value);
                    result.push(Math.round(dayIncome * 100) / 100);
               }
               return result;
        }

        this.calculateInvestIncome = function(percentage, input, dataInc) {
             var result = [];
             var totalMoney = parseFloat(input);
             var length = dataInc.length;
             result.push(0);
             var startDate = new Date(dataInc[0].date);
             for ( var i = 1 ; i < length ; i++){
                  var endDate = new Date(dataInc[i].date);
                  var year = startDate.getTime();
                  var year2 = endDate.getTime();
                  var yearsDif = new Date (year2 - year);
                  var years = (yearsDif.getUTCFullYear() - 1970);
                  if (years != 0) startDate = new Date (dataInc[i].date);
                  var dayIncome = 0.01 * percentage * totalMoney * years;
                  totalMoney += dayIncome;
                  result.push(Math.round( (totalMoney - input) * 100) / 100);
             }
             return result;
        }
    })
});