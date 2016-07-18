define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("DataService", function($http) {
        this.getRows = function(url, startDate, endDate) {
                var result = $http.get(url, {params: {startDate: startDate, endDate: endDate}});
                return result;
                }

        this.calculateFundIncome = function (input , dataInc){
               if (dataInc.length == 0) return result;
               var number = Math.round( input/dataInc[0].value );
               var result = [];
               var length = dataInc.length;
               for (var i = 0 ; i < length ; i++){
                    var dayIncome = (number * dataInc[i].value) - (number * dataInc[0].value);
                    result.push(dayIncome);
               }
               return result;
        }

        this.calculateInvestIncome = function(percentage, input, dataInc){
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
                  console.log(years);
                  if (years != 0) startDate = new Date (dataInc[i].date);
                  var dayIncome = 0.01 * percentage * totalMoney * years;
                  totalMoney += dayIncome;
                  result.push(Math.round( (totalMoney - input) * 100) / 100);
             }
             return result;
        }
    })
});