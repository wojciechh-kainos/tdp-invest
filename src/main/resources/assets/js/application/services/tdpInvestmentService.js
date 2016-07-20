define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpInvestmentService", function($http) {
        
        this.getInvestmentTimeSeries = function(startDate, endDate, amount, annualRate) {
            return $http.get("/api/investment/timeseries?startDate=" + startDate + "&endDate=" + endDate + "&amount=" + amount + "&annualRate=" + annualRate);
        };

        this.getInvestments = function() {
            return $http.get("/api/investment/list");
        };

        this.postInvestment = function(investment){
            return $http.post("/api/investment/create", investment);
        };
        
        this.editInvestment = function(investment){
            return $http.put("/api/investment/edit", investment);
        };

        this.deleteInvestment = function(id){
            return $http.delete("/api/investment/delete/" + id);
        };

    })
});