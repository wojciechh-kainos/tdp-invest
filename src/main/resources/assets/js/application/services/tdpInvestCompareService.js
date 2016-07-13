define(['angular', 'application/tdpInvestModule'], function(angular, tdpInvestModule) {
    tdpInvestModule.service('compareData', ['$http', '$stateParams', function($http, $stateParams) {
        var dataReturned;

        this.getData = function () {
            return dataReturned;
        };

        var config = {
            value_investment: 1000,
            value_capitalization: 30,
            value_percentage: 0.07,
        };

        this.setConfig = function(newConfig) {
            config = newConfig;
        }

        this.refresh = function() {

            promise = $http({
                url: '/staticdata/stock.json',
                method: "GET",
                params: config
            }).then(
                function (response) {
                    data = response.data;
                    return data;
                },
                function (error) {
                    return data;
                }
            );
        }
    }]);
});