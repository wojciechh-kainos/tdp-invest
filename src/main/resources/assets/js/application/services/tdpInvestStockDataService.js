define(['angular', 'application/tdpInvestModule'], function (angular, tdpInvestModule) {
    tdpInvestModule.service('stockData', function ($http) {
        var data;
        var fundList;

        this.getData = function () {
            return data;
        };

        this.promise = $http.get('/api/unit/select/1').then(
            function (response) {
                data = response.data;
                return data;
            },
            function (error) {
                return error;
            }
        );
        
        // this.loadFundList = $http.get('/api/fund').then(
        //     function (response) {
        //         fundList = response.data;
        //         return response;
        //     },
        //     function (error) {
        //         return error;
        //     }
        // );
    })
});
