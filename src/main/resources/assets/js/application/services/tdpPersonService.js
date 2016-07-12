define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpPersonService", function($http) {
        this.getPerson = function(personId) {
            return $http.get("/api/person/" + personId);
        };
    })
});
