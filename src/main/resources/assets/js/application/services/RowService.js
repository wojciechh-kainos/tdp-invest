define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("RowService", function($http) {
        this.getRows = function() {
            var result = $http.get("/api/rows/get");
            return result;
        };
    })
});