define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpTableService", function($http) {
        
        this.getInvestmentTimeSeries = function(startDate, endDate, amount, annualRate) {
            return $http.get("/api/investment/timeseries?startDate=" + startDate + "&endDate=" + endDate + "&amount=" + amount + "&annualRate=" + annualRate);
        };

        this.getInvestmentSpecifications = function() {
            return $http.get("/api/investment/list");
        };

    })
});