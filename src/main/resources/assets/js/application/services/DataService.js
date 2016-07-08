define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("DataService", function($http) {
        this.getRows = function(url) {
            var result = $http.get(url);
            return result;
        };
    })
});