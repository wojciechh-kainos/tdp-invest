define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpCompareService", function($http) {
        this.getData = function() {
            return $http.get("/api/compare");
        };

        this.getDataRange = function(dateFrom, dateTo) {
            var data = {
                        dateFrom: dateFrom,
                        dateTo: dateTo
                    };

                    var config = {
                        headers : {
                            'Content-Type': 'application/json;charset=utf-8;'
                        }
                    }
            return $http.post("/api/compare", data, config);
        };
    })
});


//Dodajemy serwis do zebrania danych z javy ($http.get(sciezka /api/'to co daliśmy w @Path'))