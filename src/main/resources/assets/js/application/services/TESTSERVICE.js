define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service("TESTSERVICE", function($http) {
        this.getRows = function(url) {
                return $http.get(url).then(function(response) {
                        return response.data;
                    }, function(failure) {
                          if(failure.status == "400") {
                              return "No records available for these params!";
                          };

                          if(failure.status == "500") {
                              return "Some serious server error!";
                          };
                    }
                );
        }
    })
});