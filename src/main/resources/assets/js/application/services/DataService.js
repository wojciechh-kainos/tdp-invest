define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("DataService", function($http) {
        this.getRows = function(url, startDate, endDate) {
                var result = $http.get(url, {params: {startDate: startDate, endDate: endDate}});
                return result;
                }

    })
});