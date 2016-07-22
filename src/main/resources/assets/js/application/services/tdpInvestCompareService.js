define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule, tdpInvestCompareService) {
    tdpInvestModule.service("tdpInvestCompareService", function($http) {
        this.getData = function() {
            return $http.get("/api/compare");
        };

        this.getDataRange = function(requests){
            var data = {
                requests : requests
            };
            var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            }
            return $http.post("/api/compare/date", data, config);
        };

        this.addNewStock = function(newStockDate, newStockValue) {
            var data = {
                            newStockDate: newStockDate,
                            newStockValue: newStockValue
                        };
                        var config = {
                            headers : {
                                'Content-Type': 'application/json;charset=utf-8;'
                            }
                        }
                        return $http.post("/api/compare/add", data, config);
        }
    })


});


//Dodajemy serwis do zebrania danych z javy ($http.get(sciezka /api/'to co daliśmy w @Path'))