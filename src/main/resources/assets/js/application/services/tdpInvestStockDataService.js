define(['angular', 'application/tdpInvestModule'], function (angular, tdpInvestModule) {
    tdpInvestModule.service('stockData', function ($http) {
        var data;
        this.getData = function () {
            return data;
        };
        
        this.promise = $http.get('staticdata/stock.json').then(
            function (response) {
                data = response;
                return data;
            },
            function (error) {
                data = error;
                return data;
            }
        )
    })
});