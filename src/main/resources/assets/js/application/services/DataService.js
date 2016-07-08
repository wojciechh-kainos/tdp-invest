define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("DataService", function($http) {
        this.getRows = function(mode) {
            var result = $http.get("/api/rows/get/" + mode);
            return result;
        };
    })
});