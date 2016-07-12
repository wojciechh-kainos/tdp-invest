define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpTableService", function($http) {
        this.getPerson = function(personId) {
            return $http.get("/api/person/" + personId);
        };

        this.getInvestmentTimeSeries = function(startDate, endDate, amount, annualRate) {
            return $http.get("/api/investment?startDate=" + startDate + "&endDate=" + endDate + "&amount=" + amount + "&annualRate=" + annualRate)
        }
    })
});