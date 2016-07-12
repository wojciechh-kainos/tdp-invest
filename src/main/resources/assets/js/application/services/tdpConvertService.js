define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("tdpConvertService", function($http) {
        this.CSVtoJSON = function(file){
          return $http.post("/api/convert", file);
        };
    })
});