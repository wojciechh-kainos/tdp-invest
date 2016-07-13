define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpDataService", function($http) {
        this.getInvestData = function() {
            return $http.get("/api/unit");
        };
    })
});