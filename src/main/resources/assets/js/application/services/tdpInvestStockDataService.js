define(['angular', 'application/tdpInvestModule'], function (angular, tdpInvestModule) {
    tdpInvestModule.service('stockData', function ($http) {
        var data;
        var fundList;


        this.getData = function () {
            return data;
        };

        this.getFirst = function () {
            return new Date(data[0][0]);
        };

        this.getLast = function () {
            return new Date(data[data.length - 1][0]);
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

        function getFundIndex(id) {
            return fundList.findIndex(function (item) {
                return item.id == id;
            })
        }

        this.getFundUnits = function (id) {
            if (fundList[getFundIndex(id)].units === null)
                return $http.get('/api/unit/select/' + id).then(
                    function (response) {
                        fundList[getFundIndex(id)].units = response.data;
                        return fundList[getFundIndex(id)].units;
                    },
                    function (error) {
                        return error;
                    }
                )
        };

        this.loadFundList = $http.get('/api/fund').then(
            function (response) {
                fundList = response.data;
                return fundList;
            },
            function (error) {
                return error;
            }
        );

        this.getFunds = function () {
            return fundList;
        }
    })
});
