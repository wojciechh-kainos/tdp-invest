define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpInvestmentService", function($http, $q) {
        this.getCountedInvestment = function(_startDate, _endDate, amount, investOption, annualInterest) {


            var defer = $q.defer();
            var valuesList = [];
            var dateList = [];

            var startDate = new Date(_startDate);
            var endDate = new Date(_endDate);
            var countedDate = startDate;

            var gain = amount;
            var daysInYear = 365;

            var days = dateDiffInDays(startDate, endDate);
            var investOptionInDays = Math.floor(daysInYear / investOption);
            var counter = 1;
            var investPeriodsInYearNumber = investOption;
            var investPercent = annualInterest/100;

            dateList.push(getDateString(startDate));
            valuesList.push(gain);

            for(i = 0; i <= days; i++){

                if(counter == investOptionInDays || investOptionInDays == 1){
                    gain = gain * ((investPercent/investPeriodsInYearNumber) + 1);
                    counter = 1;
                }

                valuesList.push(gain);

                countedDate = new Date(countedDate.setDate(countedDate.getDate()+1));
                dateList.push(getDateString(countedDate));

                counter += 1;
            }

           defer.resolve({
                gain : gain,
                dateList : dateList,
                valuesList : valuesList
           });

           return defer.promise;

        };

        this.getCountedStockInvestment = function(_startDate, _endDate, amount, investData){

            var defer = $q.defer();
            var startDate = new Date(_startDate);
            var endDate = new Date(_endDate);
            var days = dateDiffInDays(startDate, endDate);

            var stockValuesList = []
            var stockGain = 0;

            if(investData.length > 0){
                var stockGain = amount;
                var unitNumber = amount / investData[0].value;

                for(i = 1; i < days; i++){
                    stockValuesList.push(stockGain);
                    stockGain = unitNumber * investData[i].value;
                }
                stockGain = stockValuesList[stockValuesList.length-1];
            }

            defer.resolve({
                stockGain : stockGain,
                stockValuesList : stockValuesList
            });

           return defer.promise;

        }

        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        function dateDiffInDays(a, b) {
              var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
              var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
              return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }

        function getDateString(date) {
                        return date.toISOString().slice(0,10).replace(/-/g,".");
                };

    })
});