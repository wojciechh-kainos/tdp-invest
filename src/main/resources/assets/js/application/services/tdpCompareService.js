define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpCompareService", function($http) {
        this.getData = function() {
            return $http.get("/api/compare");
        };
    })
});


//Dodajemy serwis do zebrania danych z javy ($http.get(sciezka /api/'to co daliśmy w @Path'))