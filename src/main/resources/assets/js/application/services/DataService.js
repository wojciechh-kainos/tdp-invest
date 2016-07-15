define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("DataService", function($http) {
        this.getRows = function(url, startDate, endDate) {
                var result = $http.get(url, {params: {startDate: startDate, endDate: endDate}});
                return result;
                }

        this.calculateFundIncome = function (input , dataInc){
               var number = input/dataInc[0].value;
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
             var totalMoney = input;
             var length = dataInc.length;
             result.push(0);
             for ( var i = 1 ; i < length ; i++){
                  var startDate = new Date(dataInc[i-1].date);
                  var year = startDate.getFullYear();
                  var endDate = new Date(dataInc[i].date);
                  var year2 = endDate.getFullYear();
                  var years = year2 - year;
                  var dayIncome = 0.01 * percentage * totalMoney * years;
                  totalMoney += dayIncome;
                  console.log(totalMoney);
                  result.push(Math.round( (totalMoney - input) * 100) / 100);
             }
             return result;
        }
    })
});