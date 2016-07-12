define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("DataService", function($http) {
        this.getRowsForHome = function(url, startDate, endDate) {
                var result = $http.get(url, {params: {startDate: startDate, endDate: endDate}});
                return result;
                }

        this.getRowsForCompare = function(url, startDate, endDate, input, percentage) {
                var result = $http.get(url, {params: {startDate: startDate, endDate: endDate, input: input, percentage: percentage}});
                return result;
        }
    })
});