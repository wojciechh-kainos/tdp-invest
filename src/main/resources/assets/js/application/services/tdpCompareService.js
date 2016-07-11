define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpCompareService", function($http) {
        this.getData = function() {
            console.log($http.get("/api/compare"));
            return $http.get("/api/compare");
        };
    })
});